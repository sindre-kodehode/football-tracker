//******************************************************************************
// imports
//******************************************************************************
import "./globals.css";
import Header        from "@/components/Header";
import { Inter     } from "next/font/google";
import { ReactNode } from "react";


//******************************************************************************
// metadata
//******************************************************************************
const inter = Inter({ subsets: [ "latin" ] })

const metadata = {
  title       : "Football Tracker"                          ,
  description : "Application for tracking football results" ,
}


//******************************************************************************
// types
//******************************************************************************
type Props = {
  children : ReactNode ,
}


//******************************************************************************
// RootLayout
//******************************************************************************
const RootLayout = ( { children } : Props ) =>
  <html lang="en">
    <body className={ inter.className }>
      <Header />
      { children }
    </body>
  </html>


//******************************************************************************
// exports
//******************************************************************************
export default RootLayout;
export { metadata };
