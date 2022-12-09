import {useSession} from '../utils/auth/SessionContext';
import {useEffect, useState} from 'react';
import {TProfile} from '../types/profile';
import {Alert} from 'react-native';
import {getProfile} from '../utils/profile';

export const useProfile = () => {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<TProfile | undefined>(undefined);
  useEffect(() => {
    if (session.user) {
      getProfile(session)
        .then(data => setProfile(data as TProfile))
        .catch(err => {
          console.log('err');
          if (err instanceof Error) {
            Alert.alert(err.message);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  return {loading, profile};
};
