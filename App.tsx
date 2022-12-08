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

import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import HistoryPage from './components/HistoryPage';
import {
  faClockRotateLeft,
  faHouse,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {Session} from '@supabase/supabase-js';
import {supabase} from './lib/supabase';
import {COLORS} from './utils/globalStyle';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import {SessionProvider} from './utils/auth/SessionContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Tab = createBottomTabNavigator();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session: _session}}) => {
      setSession(_session);
    });

    supabase.auth.onAuthStateChange((_event, _session) => {
      setSession(_session);
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar />
      {session ? (
        <SessionProvider value={session}>
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
        </SessionProvider>
      ) : (
        <LoginPage />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 14,
    padding: 5,
    color: COLORS.neutral['100'],
  },
  tabBarStyle: {
    height: 80,
    backgroundColor: COLORS.secondary,
  },
});

export default App;
