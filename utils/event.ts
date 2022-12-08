import { supabase } from "../lib/supabase";
import { TEvents } from "../types/event";

export const getEvent = async (id: number) => {
    const { data, error } = await supabase
        .from('events')
        .select(`*`)
        .eq('id', id)
        .order('end_date', { ascending: true })
        .single()
        
    if (error) {
        throw error
    }
    return data as TEvents;
}