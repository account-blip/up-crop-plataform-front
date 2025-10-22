import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster as SonnerToaster } from '@/components/ui/sonner';


export const metadata: Metadata = {
  title: "UpCrop - El campo elevado a su máxima expresión",
  description: "Plataforma SaaS para gestión agrícola de precisión",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
       <link
  href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap"
  rel="stylesheet"
/>

      </head>
      <body className="font-sans antialiased">
        {children}
        <SonnerToaster />
        <Analytics />
      </body>
    </html>
  )
}