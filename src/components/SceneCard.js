import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, shadows } from '../theme/theme';

const SceneCard = ({ scene, onFavorite, isFavorite = false }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.error;
      default:
        return colors.info;
    }
  };

  const getDifficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🔥';
      case 'advanced':
        return '⚡';
      default:
        return '🎭';
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <Card style={styles.card}>
      <LinearGradient
        colors={[colors.surface, colors.surfaceVariant]}
        style={styles.gradient}
      >
        <Card.Content style={styles.content}>
          {/* Header with title and favorite button */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{scene.title}</Text>
              {scene.generated && (
                <Chip
                  mode="outlined"
                  compact
                  style={styles.aiChip}
                  textStyle={styles.aiChipText}
                >
                  ✨ AI Generated
                </Chip>
              )}
            </View>
            {onFavorite && (
              <IconButton
                icon={isFavorite ? 'heart' : 'heart-outline'}
                iconColor={isFavorite ? colors.error : colors.gray400}
                size={24}
                onPress={onFavorite}
              />
            )}
          </View>

          {/* Scene prompt */}
          <Text style={styles.prompt}>{scene.prompt}</Text>

          {/* Characters (for duo/group scenes) */}
          {scene.characters && scene.characters.length > 0 && (
            <View style={styles.charactersContainer}>
              <Text style={styles.charactersTitle}>Characters:</Text>
              {scene.characters.map((character, index) => (
                <Text key={index} style={styles.character}>
                  • {character}
                </Text>
              ))}
            </View>
          )}

          {/* Scene metadata */}
          <View style={styles.metadata}>
            <View style={styles.metadataRow}>
              <Chip
                mode="outlined"
                compact
                style={[
                  styles.difficultyChip,
                  { borderColor: getDifficultyColor(scene.difficulty) },
                ]}
                textStyle={[
                  styles.difficultyText,
                  { color: getDifficultyColor(scene.difficulty) },
                ]}
              >
                {getDifficultyEmoji(scene.difficulty)} {scene.difficulty}
              </Chip>

              <Chip
                mode="outlined"
                compact
                style={styles.durationChip}
                textStyle={styles.durationText}
              >
                ⏱️ {formatDuration(scene.duration)}
              </Chip>

              <Chip
                mode="outlined"
                compact
                style={styles.modeChip}
                textStyle={styles.modeText}
              >
                🎭 {scene.mode}
              </Chip>
            </View>

            {/* Theme and emotion tags */}
            {(scene.theme || scene.emotion) && (
              <View style={styles.tagsRow}>
                {scene.theme && (
                  <Chip
                    mode="flat"
                    compact
                    style={styles.themeChip}
                    textStyle={styles.themeText}
                  >
                    #{scene.theme}
                  </Chip>
                )}
                {scene.emotion && (
                  <Chip
                    mode="flat"
                    compact
                    style={styles.emotionChip}
                    textStyle={styles.emotionText}
                  >
                    💭 {scene.emotion}
                  </Chip>
                )}
              </View>
            )}
          </View>
        </Card.Content>
      </LinearGradient>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.medium,
  },
  gradient: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.onSurface,
    marginBottom: spacing.xs,
    lineHeight: 30,
  },
  aiChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  aiChipText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  prompt: {
    fontSize: 16,
    color: colors.gray200,
    lineHeight: 24,
    marginBottom: spacing.lg,
    fontStyle: 'italic',
  },
  charactersContainer: {
    backgroundColor: colors.background + '40',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  charactersTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  character: {
    fontSize: 14,
    color: colors.gray300,
    marginBottom: spacing.xs,
    lineHeight: 18,
  },
  metadata: {
    marginTop: spacing.sm,
  },
  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  difficultyChip: {
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
    backgroundColor: 'transparent',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  durationChip: {
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
    backgroundColor: 'transparent',
    borderColor: colors.info,
  },
  durationText: {
    fontSize: 12,
    color: colors.info,
    fontWeight: '600',
  },
  modeChip: {
    marginBottom: spacing.xs,
    backgroundColor: 'transparent',
    borderColor: colors.secondary,
  },
  modeText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  themeChip: {
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
    backgroundColor: colors.accent + '20',
  },
  themeText: {
    fontSize: 11,
    color: colors.accent,
    fontWeight: '600',
  },
  emotionChip: {
    marginBottom: spacing.xs,
    backgroundColor: colors.primary + '20',
  },
  emotionText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default SceneCard;