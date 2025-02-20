import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My landing page',
  description: 'This is my lil landing page :D',
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
