'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

const Settings = () => {
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      redirect('/settings/profile')
    }
  }, [])

  return null
}

export default Settings
