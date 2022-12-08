import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from '../lib/supabase';
import Button from './ui/Button';
import {COLORS, globalStyle} from '../utils/globalStyle';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../settings/routes';

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
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else navigation.navigate(routes.HomePage as never);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signUp({
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={[styles.verticallySpaced]}>
        <Text style={globalStyle.title}>Welcome to Mystery Santa</Text>
        <Text>
          Please enter your email and your password to{' '}
          {mode === 'login' ? 'sign in' : 'sign up'}
        </Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          autoComplete={'email'}
          style={globalStyle.input}
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
          style={{marginBottom: 16}}
          text={mode === 'login' ? 'Sign in' : 'Sign up'}
          disabled={loading}
          onPress={() =>
            mode === 'login' ? signInWithEmail() : signUpWithEmail()
          }
        />
        <View
          style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
          <Text style={{marginRight: 2}}>
            {mode === 'login' ? 'Not register yet ?' : 'Already register ?'}
          </Text>
          <TouchableOpacity disabled={loading} onPress={() => toggleMode()}>
            <Text style={{color: COLORS.primary}}>
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  verticallySpaced: {
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
