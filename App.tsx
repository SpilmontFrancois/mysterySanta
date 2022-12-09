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
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import {SessionProvider} from './utils/auth/SessionContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {routes} from './settings/routes';
import Loader from './components/ui/Loader';
import {TProfile} from './types/profile';
import {isFirstConnection} from './utils/profile';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import TabBar from './components/TabBar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [profileLoading, setProfileLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [userFirstConnection, setUserFirstConnection] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session: _session}}) => {
      if (!_session) {
        setProfileLoading(false);
        return supabase.auth.signOut();
      }
      setSession(_session);
      supabase
        .from('profiles')
        .select('*')
        .eq('id', _session?.user.id)
        .single()
        .then(({data}) => {
          console.log('IS FIRST : ', isFirstConnection(data as TProfile));
          if (isFirstConnection(data as TProfile)) {
            setUserFirstConnection(true);
          }
          setProfileLoading(false);
        });
    });

    supabase.auth.onAuthStateChange((_event, _session) => {
      console.log('CHANGE CHANGE CHANGE');
      setSession(_session);
    });
  }, []);

  if (profileLoading) return <Loader />;
  return (
    <NavigationContainer>
      <StatusBar />
      {session && (
        <SessionProvider value={session}>
          <Tab.Navigator
            initialRouteName={userFirstConnection ? 'Profile' : 'Home'}
            screenOptions={{
              tabBarStyle: styles.tabBarStyle,
              tabBarLabelStyle: styles.tabBarLabelStyle,
            }}
            tabBar={props => <TabBar {...props} />}>
            <Tab.Screen
              name={routes.Home}
              component={HomePage}
              options={{
                title: 'Home',
                tabBarIcon: () => (
                  <FontAwesomeIcon
                    icon={faHouse}
                    style={{color: '#98AABC'}}
                    size={24}
                  />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name={routes.History}
              component={HistoryPage}
              options={{
                title: 'History',
                tabBarIcon: () => (
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    style={{color: '#98AABC'}}
                    size={24}
                  />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name={routes.Profile}
              component={ProfilePage}
              options={{
                title: 'Profile',
                tabBarIcon: () => (
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{color: '#98AABC'}}
                    size={24}
                  />
                ),
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </SessionProvider>
      )}
      {!session && <AuthPage />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 14,
    padding: 5,
    color: '#98AABC',
  },
  tabBarStyle: {
    height: 80,
    backgroundColor: COLORS.secondary,
  },
});

export default App;
