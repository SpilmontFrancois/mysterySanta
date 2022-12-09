import {supabase} from '../lib/supabase';
import {TEvents} from '../types/event';

export const getEvent = async (eventId: number) => {
  const {data, error} = await supabase
    .from('events')
    .select(`*`)
    .eq('id', eventId)
    .order('end_date', {ascending: true})
    .single();

  if (error) {
    throw error;
  }
  return data as TEvents;
};

export const eventList = async () => {
  const {data, error} = await supabase.from('events').select('*');

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentEvent = async () => {
  const {data, error} = await supabase
    .from('events')
    .select('*')
    .order('end_date', {ascending: false})
    .limit(1);

  if (error) throw new Error(error.message);

  const currentDate = new Date();
  if (new Date(data?.[0].end_date) > currentDate) {
    return data?.[0] as TEvents;
  }
};
