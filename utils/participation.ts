import {supabase} from '../lib/supabase';
import {TParticipation} from '../types/participation';
import {TProfile} from '../types/profile';
import {getCurrentEvent} from './event';
import {Alert} from 'react-native';

export const getParticipations = async (userId: string) => {
  const {data, error} = await supabase
    .from('participations')
    .select(`*`)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order('created_at', {ascending: false});

  if (error) throw new Error(error.message);

  return data as TParticipation[];
};

export const createParticipation = async (
  participation: Omit<TParticipation, 'id' | 'created_at'>,
) => {
  const {data, error} = await supabase
    .from('participations')
    .insert(participation);

  if (error) throw new Error(error.message);

  return data;
};

export const handleParticipation = async (user: TProfile) => {
  try {
    const {data: matchingUser} = await supabase
      .from('profiles')
      .select('id')
      .eq('waiting_list', true)
      .eq('budget', user.budget)
      .neq('id', user.id)
      .order('updated_at', {ascending: true})
      .single();

    if (matchingUser) {
      const currentEvent = await getCurrentEvent();
      if (currentEvent) {
        await createParticipation({
          user1_id: user.id,
          user2_id: matchingUser.id,
          user1_hasPresent: false,
          user2_hasPresent: false,
          event_id: currentEvent,
        });
        console.log('CURRENT EVENT');
      } else
        Alert.alert('No event', 'There are currently no events in progress');
    } else {
      console.log('ADD TO WAITING LIST');
      await toggleWaitingList(user.id, true);
    }
  } catch (e) {
    console.error(e);
  }
};

const toggleWaitingList = async (userId: string, value: boolean) => {
  const {data, error} = await supabase
    .from('profiles')
    .update({
      waiting_list: value,
    })
    .eq('id', userId);

  if (error) throw new Error(error.message);

  return data;
};
