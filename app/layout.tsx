import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'spreadsheet App',
  description: 'spreadsheet',
  generator: 'self',
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
