// components/SessionProviderWrapper.tsx

'use client'

import { SessionProvider } from 'next-auth/react'

export const SessionProviderWrapper = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

