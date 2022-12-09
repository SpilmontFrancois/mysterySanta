import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { useProfile } from '../utils/profile';
import Loader from './ui/Loader';
import { supabase } from '../lib/supabase';
import Avatar from './profile/Avatar';
import ProfileForm from './profile/ProfileForm';
import { COLORS } from '../utils/globalStyle';
import { TouchableOpacity } from 'react-native';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ProfilePage = () => {
  const { loading, profile } = useProfile();
  console.log(profile);
  if (loading || !profile) return <Loader />;
  return (
    <ScrollView style={styles.container}>
      <TouchableHighlight
        onPress={() => supabase.auth.signOut()}
        style={{ alignSelf: 'flex-end', marginTop: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.neutral[500],
            padding: 10,
            marginBottom: 16,
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => supabase.auth.signOut()}>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            style={{ color: '#fff' }}
            size={24}
          />
          <Text style={{ color: '#fff', marginLeft: 10 }}>Sign out</Text>
        </TouchableOpacity>
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
    backgroundColor: COLORS.neutral['100'],
  },
});
export default ProfilePage;
