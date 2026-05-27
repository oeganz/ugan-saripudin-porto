import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL
const HAS_SUPABASE = !!import.meta.env.VITE_SUPABASE_URL

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!HAS_SUPABASE) {
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsAdmin(session?.user?.email === ADMIN_EMAIL)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsAdmin(session?.user?.email === ADMIN_EMAIL)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithMagicLink = async (email: string) => {
    if (!HAS_SUPABASE) return { error: new Error('Supabase not configured') }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/${import.meta.env.VITE_ADMIN_PATH}`,
      },
    })
    return { error }
  }

  const signOut = async () => {
    if (!HAS_SUPABASE) return { error: null }
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    loading,
    isAdmin,
    signInWithMagicLink,
    signOut,
  }
}
