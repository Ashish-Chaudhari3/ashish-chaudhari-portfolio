import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashish Chaudhari | Data Analyst",
  description:
    "Portfolio of Ashish Chaudhari — B.Tech Computer Science graduate focused on data analytics, SQL, Python, Power BI and Excel.",
  keywords: ["Ashish Chaudhari", "Data Analyst", "SQL", "Python", "Power BI", "Excel"],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1014" },
  ],
};

// Sets the saved theme before first paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.dataset.theme="dark"}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
