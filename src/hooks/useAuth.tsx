import React, { useState } from 'react'

function useAuth() {
  const profile = localStorage.getItem('profile')!
  const [user] = useState(JSON.parse(profile))

  const { result } = user || { user: {} }
  const userId = result?.googleId || result?._id

  if (userId) {
    return { user, userId }
  }

  return { user: '', userId: '' }
}

export default useAuth
