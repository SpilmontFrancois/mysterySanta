import {useEffect, useState} from 'react';
import {Session} from '@supabase/supabase-js';
import {supabase} from '../lib/supabase';
import {TProfile} from '../types/profile';
import {Alert} from 'react-native';
import {useSession} from './auth/SessionContext';

export const BUDGETS = {
  ['0_to_10']: '0 to 10$',
  ['10_to_20']: '10 to 20$',
  ['20_to_30']: '20 to 30$',
  ['30_to_40']: '30 to 40$',
  ['40_to_50']: '40 to 50$',
  ['50_to_75']: '50 to 75$',
  ['75_to_100']: '75 to 100$',
};

export const getProfile = async (session: Session) => {
  let {data, error, status} = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id)
    .single();
  if (error && status !== 406) {
    throw error;
  }

  return data;
};

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

export const updateProfile = async (
  userId: string,
  profileData: Partial<TProfile>,
) => {
  const {data, error} = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId);

  if (error) throw new Error('Error on profile update for user id : ' + userId);

  return data;
};
export const updateAvatar = async (userId: string, avatarUrl: string) => {
  const {data, error} = await supabase
    .from('profiles')
    .update({avatar_url: avatarUrl})
    .eq('id', userId);

  if (error) throw new Error('Error on avatar update for user id : ' + userId);

  await supabase.auth.refreshSession();
  return data;
};
