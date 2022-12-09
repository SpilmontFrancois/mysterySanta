import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ProfileForm from './ProfileForm';
import {COLORS} from '../../utils/globalStyle';
import {useProfile} from '../../utils/auth/ProfileContext';
import SignOut from './SignOut';
import FirstConnectionDialog from './FirstConnectionDialog';
import AvatarInput from './AvatarInput';

const ProfilePage = () => {
  const {profile, isFirstConnection} = useProfile();
  return (
    <>
      {isFirstConnection && <FirstConnectionDialog />}
      <ScrollView style={styles.container}>
        <SignOut />
        <AvatarInput userId={profile.id} avatarUrl={profile?.avatar_url} />
        <ProfileForm user={profile} />
      </ScrollView>
    </>
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
