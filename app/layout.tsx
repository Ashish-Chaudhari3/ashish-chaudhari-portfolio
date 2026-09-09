import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashish Chaudhari | Data Analyst",
  description:
    "Portfolio of Ashish Chaudhari — B.Tech Computer Science graduate focused on data analytics, SQL, Python, Power BI and Excel.",
  keywords: ["Ashish Chaudhari", "Data Analyst", "SQL", "Python", "Power BI", "Excel"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
