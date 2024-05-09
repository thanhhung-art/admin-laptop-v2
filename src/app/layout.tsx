import ReactQueryProvider from '@/providers/reactQueryProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CartProvider from '@/providers/cartProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'shop laptop',
  description: 'The app created by thanhung',
  other: {
    'google-site-verification': 'sS1ULAywEACOQEBiJlnCc7bR2W3Dsr_KuvpvHnrqqt8',
  }
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
