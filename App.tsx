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
import HomePage from './components/home/HomePage';
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
import ProfilePage from './components/profile/ProfilePage';
import {SessionProvider} from './utils/auth/SessionContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {routes} from './settings/routes';
import Loader from './components/ui/Loader';
import {TProfile} from './types/profile';
import {getProfile, isFirstConnection} from './utils/profile';
import TabBar from './components/navigation/TabBar';
import {ProfileProvider} from './utils/auth/ProfileContext';

const Tab = createBottomTabNavigator();

const App = () => {
  const [profileLoading, setProfileLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<TProfile | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({data: {session: _session}}) => {
        if (!_session) return;
        setSession(_session);
        getProfile(_session.user.id).then(data => {
          if (!data) supabase.auth.signOut();
          setProfile(data as TProfile);
        });
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setProfileLoading(false);
      });

    supabase.auth.onAuthStateChange((_event, _session) => {
      if (!_session) return supabase.auth.signOut();
      setSession(_session);
      getProfile(_session.user.id).then(data => {
        if (!data) supabase.auth.signOut();
        setProfile(data as TProfile);
      });
    });
  }, []);

  if (profileLoading) return <Loader />;
  return (
    <NavigationContainer>
      <StatusBar />
      {session && profile && (
        <SessionProvider value={session}>
          <ProfileProvider
            profile={profile}
            isFirstConnection={isFirstConnection(profile)}>
            <Tab.Navigator
              initialRouteName={isFirstConnection(profile) ? 'Profile' : 'Home'}
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
          </ProfileProvider>
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
