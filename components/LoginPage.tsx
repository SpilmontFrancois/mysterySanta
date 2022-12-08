import React, {useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {supabase} from '../lib/supabase';
import Button from './ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <SafeAreaView>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          autoComplete={'email'}
          style={styles.input}
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
          style={styles.input}
        />
      </View>

      <Button
        style={{marginBottom: 16}}
        text={'Sign in'}
        disabled={loading}
        onPress={() => signInWithEmail()}
      />
      <Button
        disabled={loading}
        onPress={() => signUpWithEmail()}
        text={'Sign up'}
        secondary
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
