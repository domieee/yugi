import './globals.css'
import { Inter } from 'next/font/google'

import Navigation from './components/Navigation'

import { CssVarsProvider } from '@mui/joy/styles';
import Footer from './components/Footer';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Duelist Meta | Your Source for Yu-Gi-Oh! Tournament Data and Insights',
  description: 'Unlock the Strategic Insights of the Yu-Gi-Oh! Meta | Dive into comprehensive tournament statistics and analysis on Yu-Gi-Oh! Meta. Elevate your gameplay with data-driven insights and stay ahead in the competitive scene!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssVarsProvider defaultMode="dark">
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </CssVarsProvider>
      </body>
    </html>
  )
}
