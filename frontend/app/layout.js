import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-matter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Lingua — a real class, taught by an AI teacher",
  description:
    "A serious language-learning platform where a realistic AI teacher runs scheduled live classes in a video room, with a shared board and doubts answered on the spot.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  appleWebApp: {
    capable: true,
    title: "Lingua",
    statusBarStyle: "default",
  },
};

// viewport-fit=cover lets env(safe-area-inset-*) resolve on notched
// phones; themeColor keeps the status bar on the parchment canvas.
export const viewport = {
  viewportFit: "cover",
  themeColor: "#f7f6f2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--color-parchment)] text-[var(--color-forest-ink)] font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
