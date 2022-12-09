import {supabase} from '../lib/supabase';
import {TParticipation} from '../types/participation';
import {TProfile} from '../types/profile';
import {getCurrentEvent} from './event';
import {Alert} from 'react-native';
import {toggleWaitingList} from './profile';

export const getParticipations = async (userId: string) => {
  const {data, error} = await supabase
    .from('participations')
    .select(`*`)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order('created_at', {ascending: false});

  if (error) throw new Error(error.message);

  return data as TParticipation[];
};

export const getActiveParticipation = async (userId: string) => {
  const currentEvent = await getCurrentEvent();

  const {data, error} = await supabase
    .from('participations')
    .select(`*`)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order('created_at', {ascending: false})
    .single();

  if (currentEvent?.id === data.event_id) {
    return data;
  }
  if (error) throw new Error(error.message);
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

export enum PARTICIPATION_STATUS {
  'CREATED',
  'WAITING_LIST',
}

export const handleParticipation = async (user: TProfile) => {
  try {
    const {data: matchingUser} = await supabase
      .from('profiles')
      .select('*')
      .eq('waiting_list', true)
      .eq('budget', user.budget)
      .neq('id', user.id)
      .order('updated_at', {ascending: true})
      .single();

    if (matchingUser) {
      const currentEvent = await getCurrentEvent();
      console.log('CURRENT EVENT : ', currentEvent);
      if (currentEvent) {
        await createParticipation({
          user1_id: user.id,
          user2_id: matchingUser.id,
          user1_hasPresent: false,
          user2_hasPresent: false,
          event_id: currentEvent.id,
        });

        if (user.waiting_list) {
          await toggleWaitingList(user.id, false);
        }
        if (matchingUser.waiting_list) {
          await toggleWaitingList(matchingUser.id, false);
        }

        return PARTICIPATION_STATUS.CREATED;
      } else
        Alert.alert('No event', 'There are currently no events in progress');
    } else {
      await toggleWaitingList(user.id, true);
      return PARTICIPATION_STATUS.WAITING_LIST;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await supabase.auth.refreshSession();
  }
};
