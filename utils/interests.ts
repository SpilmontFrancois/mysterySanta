import {supabase} from '../lib/supabase';

export const getInterests = async () => {
  const {data, error} = await supabase.from('interests').select('*');

  if (error) throw new Error('Error while trying to get interests');

  return data;
};
