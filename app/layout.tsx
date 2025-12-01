import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My socials :D',
  description: 'This is my (nickje2000) landing page :P',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
