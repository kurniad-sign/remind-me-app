import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { ThemeProvider } from '@/components/providers/next-themes';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

import '../styles/globals.css';

const fontSans = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(fontSans.className, 'light')}
        style={{ colorScheme: 'light' }}
        suppressHydrationWarning
      >
        <body className="flex flex-col min-h-screen w-full dark:bg-zinc-950">
          <ThemeProvider>{children}</ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
