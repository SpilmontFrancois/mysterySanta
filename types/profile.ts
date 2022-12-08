import {definitions} from './supabase';

export type TProfile = Omit<definitions['profiles'], 'id'>;
