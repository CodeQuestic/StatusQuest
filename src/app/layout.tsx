import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "StatusQuest",
  description:
    "Visualize, Learn, and Master HTTP Status Codes with Real-World Simulations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
