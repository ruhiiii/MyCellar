import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import AddWineScreen from './src/screens/AddWineScreen';
import WineDetailScreen from './src/screens/WineDetailScreen';
import CommunityInsightsScreen from './src/screens/CommunityInsightsScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar style="dark" />
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: { backgroundColor: '#fafafa' },
                        headerTintColor: '#1d1d1f',
                        headerTitleStyle: { fontWeight: '600' },
                    }}
                >
                    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Cellar' }} />
                    <Stack.Screen name="AddWine" component={AddWineScreen} options={{ title: 'Add Wine' }} />
                    <Stack.Screen name="WineDetail" component={WineDetailScreen} options={{ title: 'Wine Details' }} />
                    <Stack.Screen name="CommunityInsights" component={CommunityInsightsScreen} options={{ title: 'Community Insights' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
