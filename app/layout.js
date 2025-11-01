
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { OrderTrackerProvider } from "@/components/contexts/OrderTrackerContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="./c.png" type="image/x-icon" />

      <body
        className={` dark:text-black dark:bg-white max-w-screen-lg mx-auto`}
      >


        <Navbar />
        <OrderTrackerProvider >
          {children}
        </OrderTrackerProvider>
        <Footer />
      </body>
    </html>
  );
}
