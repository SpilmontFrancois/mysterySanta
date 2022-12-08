import {Text, View} from 'react-native';
import {useProfile} from '../utils/session';
import {useSession} from '../utils/auth/SessionContext';

const ProfilePage = () => {
  const session = useSession();
  const {loading, profile} = useProfile(session);

  if (loading) return <Text>Loading...</Text>;
  console.log(profile);
  return (
    <View>
      <Text>{profile?.full_name}</Text>
    </View>
  );
};

export default ProfilePage;
