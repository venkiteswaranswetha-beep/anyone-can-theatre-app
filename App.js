import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { store } from './src/store/store';
import { theme } from './src/theme/theme';

// Screen Imports
import PlayScreen from './src/screens/PlayScreen';
import CreateScreen from './src/screens/CreateScreen';
import CoachScreen from './src/screens/CoachScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Custom Tab Bar Icon Component
import TabBarIcon from './src/components/TabBarIcon';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#1C1C1E" />
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#FF6B35',
              tabBarInactiveTintColor: '#8E8E93',
              tabBarStyle: {
                backgroundColor: '#1C1C1E',
                borderTopColor: '#38383A',
                borderTopWidth: 1,
                height: 90,
                paddingBottom: 20,
                paddingTop: 10,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
              },
              headerStyle: {
                backgroundColor: '#1C1C1E',
                borderBottomColor: '#38383A',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
              },
            }}
          >
            <Tab.Screen 
              name="Play" 
              component={PlayScreen}
              options={{
                title: '🎭 Play',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name="play-circle" color={color} focused={focused} />
                ),
                headerTitle: 'Ready to Perform?'
              }}
            />
            <Tab.Screen 
              name="Create" 
              component={CreateScreen}
              options={{
                title: '✍️ Create',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name="create" color={color} focused={focused} />
                ),
                headerTitle: 'Scene Generator'
              }}
            />
            <Tab.Screen 
              name="Coach" 
              component={CoachScreen}
              options={{
                title: '🎤 Coach',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name="mic" color={color} focused={focused} />
                ),
                headerTitle: 'Voice & Acting Coach'
              }}
            />
            <Tab.Screen 
              name="Community" 
              component={CommunityScreen}
              options={{
                title: '👥 Community',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name="people" color={color} focused={focused} />
                ),
                headerTitle: 'Theatre Community'
              }}
            />
            <Tab.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{
                title: '👤 Profile',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name="person" color={color} focused={focused} />
                ),
                headerTitle: 'Your Theatre Journey'
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}