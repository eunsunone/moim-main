import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/logout/actions";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "moim-main",
  description: "이벤트 모임 플랫폼",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg">
            moim
          </Link>
          <nav className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <form action={logout}>
                  <Button type="submit" variant="outline" size="sm">
                    로그아웃
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Button render={<Link href="/login" />} nativeButton={false} variant="ghost" size="sm">
                  로그인
                </Button>
                <Button render={<Link href="/signup" />} nativeButton={false} size="sm">
                  회원가입
                </Button>
              </>
            )}
          </nav>
        </header>
        <main className="flex flex-col flex-1">{children}</main>
      </body>
    </html>
  );
}
