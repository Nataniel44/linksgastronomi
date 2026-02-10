
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { OrderTrackerProvider } from "@/components/contexts/OrderTrackerContext";
import { Toaster } from "react-hot-toast";



export const metadata = {
  title: "Clickcito - Tu negocio en internet, simple",
  description: "Ayudamos a comercios de San Vicente a vender más con herramientas digitales fáciles de usar.",
  openGraph: {
    title: "Clickcito - Tu negocio en internet, simple",
    description: "Ayudamos a comercios de San Vicente a vender más con herramientas digitales fáciles de usar.",
    url: "https://clickcito.com", // Replace with actual domain if known, otherwise localhost or relative
    siteName: "Clickcito",
    images: [
      {
        url: "/opengraph-image.png", // Next.js will resolve this automatically if placed in app/ or public/
        width: 1200,
        height: 630,
        alt: "Clickcito Promotional Banner",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
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
