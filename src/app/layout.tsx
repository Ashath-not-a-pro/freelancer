import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freelancer",
  description: "App to help freelancers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen w-full bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
