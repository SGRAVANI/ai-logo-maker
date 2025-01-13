import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
//import StateContext from "./_Context/StateContext";

const host_Grotesk=Host_Grotesk({
  subsets:["latin"],

})
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Al Logo Generator",
  description: "Generate Your Logo Using AI",
};

export default function RootLayout({ children }) {
  return (
     
       <ClerkProvider>
        
    <html lang="en">
      <body
        className={host_Grotesk.className}
      >
       
        <Provider >
          {children}
        </Provider>
       
      </body>
    </html>

    </ClerkProvider>
    

  );
}
