import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {useProfile} from '../utils/profile';
import Loader from './ui/Loader';
import {supabase} from '../lib/supabase';
import Avatar from './profile/Avatar';
import ProfileForm from './profile/ProfileForm';
import {COLORS} from '../utils/globalStyle';

const ProfilePage = () => {
  const {loading, profile} = useProfile();
  console.log(profile);
  if (loading) return <Loader />;
  return (
    <ScrollView style={styles.container}>
      <TouchableHighlight
        onPress={() => supabase.auth.signOut()}
        style={{alignSelf: 'flex-end', marginTop: 16}}>
        <Text style={{color: COLORS.neutral['900']}}>Sign out</Text>
      </TouchableHighlight>
      <Avatar userId={profile.id} avatarUrl={profile?.avatar_url} />
      <ProfileForm user={profile} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});
export default ProfilePage;
