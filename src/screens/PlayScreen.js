import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Chip,
  ActivityIndicator,
  IconButton,
  Surface,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';

import {
  generateScene,
  selectCurrentScene,
  selectSceneLoading,
  selectSceneError,
  selectScenePreferences,
  updatePreferences,
} from '../store/slices/sceneSlice';
import { colors, spacing, shadows } from '../theme/theme';
import ModeSelector from '../components/ModeSelector';
import SceneCard from '../components/SceneCard';
import RecordingControls from '../components/RecordingControls';
import CountdownTimer from '../components/CountdownTimer';

const { width, height } = Dimensions.get('window');

const PlayScreen = () => {
  const dispatch = useDispatch();
  const currentScene = useSelector(selectCurrentScene);
  const loading = useSelector(selectSceneLoading);
  const error = useSelector(selectSceneError);
  const preferences = useSelector(selectScenePreferences);

  const [isRecording, setIsRecording] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [audioPermission, setAudioPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

  const cameraRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    requestPermissions();
    if (!currentScene) {
      handleGenerateScene();
    }
    animateIn();
  }, []);

  useEffect(() => {
    if (currentScene) {
      animateIn();
    }
  }, [currentScene]);

  const requestPermissions = async () => {
    try {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      
      setCameraPermission(cameraStatus.status === 'granted');
      setAudioPermission(audioStatus.status === 'granted');
    } catch (error) {
      console.error('Permission request error:', error);
      Alert.alert('Permission Error', 'Unable to request camera permissions');
    }
  };

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleGenerateScene = async () => {
    try {
      await dispatch(generateScene({
        mode: preferences.mode,
        theme: null,
        emotion: null,
      })).unwrap();
    } catch (error) {
      Alert.alert('Generation Error', 'Failed to generate scene. Please try again.');
    }
  };

  const handleModeChange = (newMode) => {
    dispatch(updatePreferences({ mode: newMode }));
    handleGenerateScene();
  };

  const handleStartRecording = async () => {
    if (!cameraPermission || !audioPermission) {
      Alert.alert(
        'Permissions Required',
        'Camera and microphone permissions are required to record your performance.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Grant Permissions', onPress: requestPermissions },
        ]
      );
      return;
    }

    if (!currentScene) {
      Alert.alert('No Scene', 'Please generate a scene first.');
      return;
    }

    setShowCountdown(true);
  };

  const handleCountdownComplete = async () => {
    setShowCountdown(false);
    setIsRecording(true);

    try {
      if (cameraRef.current) {
        const recording = await cameraRef.current.recordAsync({
          quality: Camera.Constants.VideoQuality['720p'],
          maxDuration: currentScene.duration + 10, // Add 10 seconds buffer
          mute: false,
        });
        
        console.log('Recording saved to:', recording.uri);
        // Handle the recorded video (save, preview, share, etc.)
      }
    } catch (error) {
      console.error('Recording error:', error);
      Alert.alert('Recording Error', 'Failed to start recording. Please try again.');
      setIsRecording(false);
    }
  };

  const handleStopRecording = async () => {
    try {
      if (cameraRef.current && isRecording) {
        await cameraRef.current.stopRecording();
      }
      setIsRecording(false);
      
      Alert.alert(
        'Recording Complete!',
        'Your performance has been saved. Would you like to preview it?',
        [
          { text: 'Generate New Scene', onPress: handleGenerateScene },
          { text: 'Preview Recording', onPress: () => {/* Navigate to preview */} },
        ]
      );
    } catch (error) {
      console.error('Stop recording error:', error);
      setIsRecording(false);
    }
  };

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>😔 Something went wrong</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <Button
          mode="contained"
          onPress={handleGenerateScene}
          style={styles.retryButton}
        >
          Try Again
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.welcomeText}>Ready to Perform?</Text>
            <Text style={styles.subtitleText}>
              Choose your mode and let's create some magic! ✨
            </Text>
          </Animated.View>

          {/* Mode Selector */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <ModeSelector
              selectedMode={preferences.mode}
              onModeChange={handleModeChange}
            />
          </Animated.View>

          {/* Scene Display */}
          {loading ? (
            <Surface style={styles.loadingCard}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Generating your scene...</Text>
            </Surface>
          ) : currentScene ? (
            <Animated.View
              style={[
                { opacity: fadeAnim },
                { transform: [{ scale: scaleAnim }] },
              ]}
            >
              <SceneCard scene={currentScene} />
            </Animated.View>
          ) : null}

          {/* Camera Preview */}
          {cameraPermission && !isRecording && !showCountdown && (
            <Surface style={styles.cameraContainer}>
              <Camera
                ref={cameraRef}
                style={styles.camera}
                type={cameraType}
                ratio="16:9"
              >
                <View style={styles.cameraOverlay}>
                  <IconButton
                    icon="camera-flip"
                    iconColor={colors.onSurface}
                    size={24}
                    onPress={flipCamera}
                    style={styles.flipButton}
                  />
                </View>
              </Camera>
            </Surface>
          )}

          {/* Recording Controls */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <RecordingControls
              isRecording={isRecording}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              disabled={!currentScene || loading}
            />
          </Animated.View>

          {/* Generate New Scene Button */}
          <Button
            mode="outlined"
            onPress={handleGenerateScene}
            style={styles.newSceneButton}
            contentStyle={styles.newSceneButtonContent}
            labelStyle={styles.newSceneButtonLabel}
            disabled={loading}
          >
            🎲 Generate New Scene
          </Button>

          {/* Quick Tips */}
          <Card style={styles.tipsCard}>
            <Card.Content>
              <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
              <Text style={styles.tipsText}>
                • Find good lighting and a quiet space{'\n'}
                • Don't worry about being perfect - have fun!{'\n'}
                • Use gestures and facial expressions{'\n'}
                • Stay in character throughout the scene
              </Text>
            </Card.Content>
          </Card>
        </ScrollView>

        {/* Countdown Overlay */}
        {showCountdown && (
          <CountdownTimer
            duration={3}
            onComplete={handleCountdownComplete}
            onCancel={() => setShowCountdown(false)}
          />
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>RECORDING</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingTop: spacing.md,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.onBackground,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitleText: {
    fontSize: 16,
    color: colors.gray400,
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingCard: {
    padding: spacing.xl,
    alignItems: 'center',
    marginVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 16,
    ...shadows.medium,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.onSurface,
  },
  cameraContainer: {
    marginVertical: spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.large,
  },
  camera: {
    width: '100%',
    height: 200,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: spacing.sm,
  },
  flipButton: {
    backgroundColor: colors.overlay,
  },
  newSceneButton: {
    marginVertical: spacing.lg,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  newSceneButtonContent: {
    paddingVertical: spacing.sm,
  },
  newSceneButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  tipsCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    ...shadows.small,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  tipsText: {
    fontSize: 14,
    color: colors.gray300,
    lineHeight: 20,
  },
  recordingIndicator: {
    position: 'absolute',
    top: 60,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    ...shadows.medium,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.onSurface,
    marginRight: spacing.sm,
  },
  recordingText: {
    color: colors.onSurface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.onBackground,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  errorSubtext: {
    fontSize: 16,
    color: colors.gray400,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  retryButton: {
    backgroundColor: colors.primary,
  },
});

export default PlayScreen;