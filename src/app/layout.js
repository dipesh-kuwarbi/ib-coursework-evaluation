import { Bricolage_Grotesque } from "next/font/google";
import "../styles/globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata = {
  title: "IB coursework",
  description: "IB coursework",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bricolage.className} min-h-screen bg-[#E4ECF3]`}>
        {children}
      </body>
    </html>
  );
}
