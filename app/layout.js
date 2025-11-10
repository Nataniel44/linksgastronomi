
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { OrderTrackerProvider } from "@/components/contexts/OrderTrackerContext";
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="./c.png" type="image/x-icon" />

      <body
        className={`dark:bg-white max-w-screen-2xl mx-auto`}
      >


        <Navbar />
        <OrderTrackerProvider >
          {children}     <Toaster position="top-center" />
        </OrderTrackerProvider>
        <Footer />
      </body>
    </html>
  );
}
