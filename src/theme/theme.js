import { MD3LightTheme } from 'react-native-paper';

export const colors = {
  // Primary Brand Colors
  primary: '#FF6B35',        // Vibrant Orange
  secondary: '#6B46C1',      // Deep Purple
  accent: '#F59E0B',         // Golden Yellow
  
  // Background Colors
  background: '#000000',     // Pure Black
  surface: '#1C1C1E',        // Dark Gray
  surfaceVariant: '#2C2C2E', // Medium Gray
  
  // Text Colors
  onBackground: '#FFFFFF',   // White text on dark
  onSurface: '#FFFFFF',      // White text
  onPrimary: '#FFFFFF',      // White text on orange
  onSecondary: '#FFFFFF',    // White text on purple
  
  // Status Colors
  success: '#10B981',        // Green
  warning: '#F59E0B',        // Amber
  error: '#EF4444',          // Red
  info: '#3B82F6',           // Blue
  
  // Neutral Colors
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Transparent overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    onBackground: colors.onBackground,
    onSurface: colors.onSurface,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    displayLarge: {
      fontFamily: 'System',
      fontSize: 57,
      fontWeight: '400',
      lineHeight: 64,
    },
    displayMedium: {
      fontFamily: 'System',
      fontSize: 45,
      fontWeight: '400',
      lineHeight: 52,
    },
    displaySmall: {
      fontFamily: 'System',
      fontSize: 36,
      fontWeight: '400',
      lineHeight: 44,
    },
    headlineLarge: {
      fontFamily: 'System',
      fontSize: 32,
      fontWeight: '600',
      lineHeight: 40,
    },
    headlineMedium: {
      fontFamily: 'System',
      fontSize: 28,
      fontWeight: '600',
      lineHeight: 36,
    },
    headlineSmall: {
      fontFamily: 'System',
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    titleLarge: {
      fontFamily: 'System',
      fontSize: 22,
      fontWeight: '600',
      lineHeight: 28,
    },
    titleMedium: {
      fontFamily: 'System',
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
    titleSmall: {
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
    },
    bodyLarge: {
      fontFamily: 'System',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    bodyMedium: {
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    bodySmall: {
      fontFamily: 'System',
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
  },
  roundness: 12,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};