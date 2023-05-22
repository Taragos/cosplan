import type { Database } from "$lib/models/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";

export const uploadFile = async (file: any, supabase: SupabaseClient<Database>) => {
    if (!(file instanceof File)) {
        return 
    }

    const {data: fileData, error: fileError } = await supabase.storage.from('images').upload(crypto.randomUUID(), file);

    if (fileError) {
        return
    }

    return fileData
}