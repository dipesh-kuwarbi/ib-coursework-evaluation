import { Bricolage_Grotesque } from "next/font/google";
import "../styles/globals.css";
import { SvgMobileIcon } from "../../public/icons/SvgMobileLogo";
import { SvgThreeLineIcon } from "../../public/icons/SvgThreeLineIcon";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata = {
  title: "IB coursework",
  description: "IB coursework",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.className} max-w-full min-h-screen bg-[#E4ECF3]`}
      >
        <header className="sticky top-0 z-[100] flex h-[60px] w-full items-center justify-between bg-white pl-0 sm:hidden md:pl-[42px]">
          <div className="grid h-11 w-28 place-items-center">
            <SvgMobileIcon />
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="md:hidden">
              <div>
                <button
                  type="button"
                  id="radix-:r8:"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-state="closed"
                  className="outline-none"
                >
                  <div className="flex size-[32px] items-center justify-center">
                    <SvgThreeLineIcon />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
