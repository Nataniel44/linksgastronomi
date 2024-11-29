
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` dark:text-white dark:bg-black max-w-screen-md mx-auto`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
