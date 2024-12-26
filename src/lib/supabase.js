import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase URL or Key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const checkSupabaseConnection = async () => {
    try {
        const { error } = await supabase.from('contacts').select('count', { head: true });
        if (error) {
            throw error;
        }
        console.log('Supabase connected successfully');
        return true;
    } catch (error) {
        console.error('Supabase connection error:', error.message);
        if (error.message.includes('Failed to fetch')) {
            console.error('CORS or network issue detected');
        }
        return false;
    }
};
