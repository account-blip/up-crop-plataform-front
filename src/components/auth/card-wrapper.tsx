'use client'

import { Suspense } from 'react'
import { Socials } from './socials'

interface CardWrapperProps {
  children: React.ReactNode
  showSocials?: boolean
}

export function CardWrapper({
  children,
  showSocials = false,
}: CardWrapperProps) {
  return (
    <div>
      <div>{children}</div>
      {showSocials && (
        <div className="mt-6">
          <Suspense>
            <Socials />
          </Suspense>
        </div>
      )}
    </div>
  )
}
