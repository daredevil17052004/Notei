import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { dbConnect } from "@/lib/mongo";

const inter = Inter({ subsets: ["latin"] });

const mont = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
})

export const metadata = {
  title: "Maintainer",
  description: "A one-stop maintainance solution for you Car",
};

export default async function RootLayout({ children }) {
  const conne = await dbConnect();
  if(conne){
    console.log('Connected to DB')
  }
  return (
    <html lang="en">
      <body className={`${inter.className} ${mont.className}`}>
          {children}

      </body> 
    </html>
  );
}
