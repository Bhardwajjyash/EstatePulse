import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/comonents/Navbar";
import Footer from "@/comonents/Footer";
import AuthProvider from "@/comonents/authProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={{ children }}>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer/>
        </body>
      </html>
    </AuthProvider>
  );
}
