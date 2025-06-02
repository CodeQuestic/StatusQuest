import type { Metadata } from "next";

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
        {children}
      </body>
    </html>
  );
}
