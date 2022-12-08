import { supabase } from "../lib/supabase"
import { TParticipations } from "../types/participation";

export const getParticipation = async (id: string) => {
    const { data, error } = await supabase
        .from('participations')
        .select(`*`)
        .or(`user1_id.eq.${id},user2_id.eq.${id}`)
        console.log(data);
        
    if (error) {
        throw error
    }
    return data as TParticipations[];
}