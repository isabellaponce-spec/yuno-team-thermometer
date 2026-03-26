import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Team Thermometer · Yuno',
  description: 'Monthly team health pulse check — People Team, Yuno',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
