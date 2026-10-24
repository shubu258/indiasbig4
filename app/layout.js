import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-head",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// Logo wordmark only
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata = {
  title: "S&S | Chartered Accountants",
  description:
    "S&S Chartered Accountants: accounting, tax, payroll, finance reporting, virtual CFO, audit support and India business setup.",
};

export const viewport = {
  themeColor: "#2a0e4a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
