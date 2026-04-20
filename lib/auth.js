import { supabase } from '../supabase'

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function isAdmin(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()
  
  if (error) return false
  return data.role === 'is_admin'
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  
  // Check if user is admin after successful sign-in
  if (data.user) {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', data.user.id)
      .single()
    
    if (profileError || !profileData?.is_admin) {
      await supabase.auth.signOut()
      throw new Error('Access denied. Admin privileges required.')
    }
  }
  
  return data
}
