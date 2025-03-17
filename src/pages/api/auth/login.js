import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body
    console.log('Login attempt')

    const { data: { user }, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata.name
      }
    })

  } catch (error) {
    console.error('Login failed:', error.message)
    res.status(400).json({ 
      error: 'Invalid credentials'
    })
  }
}