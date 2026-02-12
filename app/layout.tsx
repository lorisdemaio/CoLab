import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Image from "next/image";
import { redirect } from "next/navigation";

import { type ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import logo from '../public/logo_colab.webp';

import "./styles/globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/ReactToastify.css';

// components
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

// lib
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

// hook
import { UserDataProvider } from "@/hook/useUserData";

export const metadata: Metadata = {
  metadataBase: new URL("https://lorisdemaio.is-a.dev"),
  title: "CoLab",
  description: "",
  icons: {
    icon: "/logo_colab.webp"
  },
  authors: [{ name: "Loris De Maio" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://",
  },
  openGraph: {
    title: "CoLab",
    description:
      "",
    url: "https://",
    siteName: "CoLab",
    images: [
      {
        url: "https://",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoLab",
    description:
      "",
    images: ["https://"],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function layout({ children }: { children: ReactNode }) {

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return(
    <html lang="it">
      <body>
        <UserDataProvider init={user}>
        {/* HEADER / NAVBAR */}
        <header>
          <Navbar 
            navLogo={
              <Image src={logo} alt="logo" />
            }
            links={[
              { label: "GitHub", url: "/" },
            ]} 
            navButton={{
              label: "Start now",
              url: "/register"
            }}
          />
        </header>
        
        {/* MAIN */}
        <main>
            {children}
            
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />

        </main>

        {/* FOOTER */}
        <footer>
          <Footer
            links={[
              { label: "GitHub", url: "/", target: false }
            ]} 
          />
        </footer>
        
        {/* SCRIPTS */}
        <Script
          id="person-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Loris De Maio",
              jobTitle: "Junior Full Stack Web Developer",
              url: "https://",
              sameAs: [
                "https://www.linkedin.com/in/lorisdemaio",
                "https://github.com/lorisdemaio",
              ],
            }),
          }}
        />

        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Portfolio di Loris De Maio",
              url: "https://",
            }),
          }}
        />
        </UserDataProvider>
      </body>
    </html>
  );
}
