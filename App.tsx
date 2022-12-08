/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import HistoryPage from './components/HistoryPage';
import ProfilePage from './components/ProfilePage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClockRotateLeft,
  faHouse,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Tab.Navigator initialRouteName={'Home'}>
        <Tab.Screen
          name={'homePage'}
          component={HomePage}
          options={{
            title: 'Home',
            tabBarIcon: () => <FontAwesomeIcon icon={faHouse} />,
          }}
        />
        <Tab.Screen
          name={'history'}
          component={HistoryPage}
          options={{
            title: 'History',
            tabBarIcon: () => <FontAwesomeIcon icon={faClockRotateLeft} />,
          }}
        />
        <Tab.Screen
          name={'profile'}
          component={ProfilePage}
          options={{
            title: 'Profile',
            tabBarIcon: () => <FontAwesomeIcon icon={faUser} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
