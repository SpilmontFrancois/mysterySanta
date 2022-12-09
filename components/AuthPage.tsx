import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../lib/supabase';
import Button from './ui/Button';
import { COLORS, globalStyle } from '../utils/globalStyle';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../settings/routes';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'login' ? 'register' : 'login'));
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else navigation.navigate(routes.HomePage as never);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else {
      Alert.alert(
        'Registration successfull',
        'Please go check your emails and click on the link to validate your account',
      );

      setEmail('');
      setPassword('');
      setMode('login');
    }
    setLoading(false);
  }

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 32,
        width: '100%',
        height: '100%',
      }}>
      <View style={[styles.logo, styles.mt20]}>
        <Image source={require('../assets/img/Logo.png')} style={{ width: 132, height: 132 }} />
        <Image source={require('../assets/img/AppName.png')} />
      </View>
      <View style={styles.centered}>
        <Text style={styles.title}>
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={{ textAlign: 'center' }}>
          Please enter your email and your password to{' '}
          {mode === 'login' ? 'sign in' : 'sign up'}
          .
        </Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          autoComplete={'email'}
          style={[globalStyle.input, styles.mt20]}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          autoComplete={'password'}
          style={globalStyle.input}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          style={{ marginBottom: 16 }}
          text={mode === 'login' ? 'Sign in' : 'Sign up'}
          disabled={loading}
          onPress={() =>
            mode === 'login' ? signInWithEmail() : signUpWithEmail()
          }
        />
        <View
          style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ marginRight: 2 }}>
            {mode === 'login' ? 'Not registered yet ?' : 'Already registered ?'}
          </Text>
          <TouchableOpacity disabled={loading} onPress={() => toggleMode()}>
            <Text style={{ color: COLORS.primary }}>
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: COLORS.neutral[900],
  },
});
