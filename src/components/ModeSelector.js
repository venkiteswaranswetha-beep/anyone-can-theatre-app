import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Surface } from 'react-native-paper';
import { colors, spacing, shadows } from '../theme/theme';

const ModeSelector = ({ selectedMode, onModeChange }) => {
  const modes = [
    {
      key: 'solo',
      label: '🎭 Solo',
      description: 'Just you',
    },
    {
      key: 'duo',
      label: '👥 Duo',
      description: 'Two people',
    },
    {
      key: 'group',
      label: '🎪 Group',
      description: '3+ people',
    },
  ];

  return (
    <Surface style={styles.container}>
      <View style={styles.chipContainer}>
        {modes.map((mode) => (
          <Chip
            key={mode.key}
            mode={selectedMode === mode.key ? 'flat' : 'outlined'}
            selected={selectedMode === mode.key}
            onPress={() => onModeChange(mode.key)}
            style={[
              styles.chip,
              selectedMode === mode.key && styles.selectedChip,
            ]}
            textStyle={[
              styles.chipText,
              selectedMode === mode.key && styles.selectedChipText,
            ]}
            selectedColor={colors.onPrimary}
          >
            {mode.label}
          </Chip>
        ))}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  chip: {
    flex: 1,
    marginHorizontal: spacing.xs,
    backgroundColor: 'transparent',
    borderColor: colors.gray600,
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray300,
  },
  selectedChipText: {
    color: colors.onPrimary,
  },
});

export default ModeSelector;