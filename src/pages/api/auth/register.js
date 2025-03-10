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
    const { email, password, name } = req.body
    console.log('Registration attempt')

    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
    const userExists = existingUser.users.some(user => user.email === email)
    
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name }
    })

    console.log('User creation:', { 
      success: !!newUser,
      error: createError ? 'Error occurred' : null
    })

    if (createError) throw createError

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: newUser.user.id,
        email: email,
        name: name
      })

    if (profileError) {
      console.error('Profile creation failed')
      await supabaseAdmin.auth.admin.deleteUser(newUser.user.id)
      throw profileError
    }

    res.status(200).json({
      user: {
        id: newUser.user.id,
        email: newUser.user.email,
        name
      }
    })

  } catch (error) {
    console.error('Registration failed')
    res.status(400).json({ 
      error: 'Registration failed'
    })
  }
} 