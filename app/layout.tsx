import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Sovereign Pure-Pull Marketing Matrix',
  description: 'Autonomous platform asset delivery system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com" defer></script>
      </head>
      <body className="antialiased bg-slate-950 text-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
