import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InnoSpark - منصة إدارة الأفكار التفاعلية",
  description: "منصة تفاعلية لإدارة وتطوير الأفكار داخل الفرق باستخدام مكونات الألعاب والتواصل الجماعي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
