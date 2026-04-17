// These styles apply to every route in the application
import './global.css';
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dr. GW Williams Secondary School STUCO',
  description: 'STUCO Cloud Portal for Dr. GW Williams Secondary School',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN Link */}
      <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
      {/* Google Fonts CDN Link */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}