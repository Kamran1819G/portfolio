import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header/header";
import Cursor from "@/components/Cursor";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Kamran Khan",
  description: "Kamran Khan's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${open_sans.className}`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Cursor />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
