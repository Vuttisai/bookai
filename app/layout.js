import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Head from 'next/head'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title:'BOOK AI',
  description: 'Generats  Book',
  verification: {
    google: 'Ufnd3PO3h5IaNzHeBVyPlf3tbDoJktGEIpaQAuHt4ps',}

}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    
    <html lang="en">
    {/* <Head>
          {metadata.googleSiteVerification && (
            <meta
              name="google-site-verification"
              content={metadata.googleSiteVerification}
            />
          )}
        </Head> */}
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  )
}
