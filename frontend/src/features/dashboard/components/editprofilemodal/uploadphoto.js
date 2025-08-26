import { supabase } from '../../../../utils/supabase'

export default async function uploadPhoto(bucket, file) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(crypto.randomUUID(), file)
  if (error) throw new Error('Uploading error')
  const { data: publicData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)
  return publicData.publicUrl
}
