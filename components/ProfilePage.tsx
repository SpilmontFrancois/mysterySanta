import {Text, TouchableHighlight, View} from 'react-native';
import {useProfile} from '../utils/session';
import Loader from './ui/Loader';
import {supabase} from '../lib/supabase';

const ProfilePage = () => {
  const {loading, profile} = useProfile();

  if (loading) return <Loader />;
  console.log(profile);
  return (
    <View>
      <Text>{profile?.full_name}</Text>
      <TouchableHighlight onPress={() => supabase.auth.signOut()}>
        <Text>Sign out</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ProfilePage;
