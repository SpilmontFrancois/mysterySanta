import {useEffect, useState} from 'react';
import {Session} from '@supabase/supabase-js';
import {supabase} from '../lib/supabase';
import {TProfile} from '../types/profile';
import {Alert} from 'react-native';

export async function getProfile(session: Session) {
  let {data, error, status} = await supabase
    .from('profiles')
    .select(`full_name, avatar_url, budget, interests`)
    .eq('id', session?.user.id)
    .single();
  if (error && status !== 406) {
    throw error;
  }

  return data;
}
export function useProfile(session: Session) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<TProfile | undefined>(undefined);
  useEffect(() => {
    getProfile(session)
      .then(data => {
        setProfile(data as TProfile);
      })
      .catch(err => {
        if (err instanceof Error) {
          Alert.alert(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, [session]);

  if (!session?.user) throw new Error('No user on the session!');

  return {loading, profile};
}