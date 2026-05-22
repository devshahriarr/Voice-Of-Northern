import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Voice of Northern - Student Rights & Community Empowerment",
    template: "%s | Voice of Northern",
  },
  description:
    "Voice of Northern (VON) is a student-centric platform dedicated to advocating student rights, managing complaints transparently, verification of memberships, and organizing events.",
  keywords: [
    "Voice of Northern",
    "VON",
    "Student Rights",
    "Student Advocacy",
    "Northern University",
    "Community Empowerment",
  ],
  authors: [{ name: "Voice of Northern Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} dark`} style={{ colorScheme: "dark" }}>
      <body className="bg-navy-950 text-slate-100 min-h-screen flex flex-col antialiased font-sans">
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
