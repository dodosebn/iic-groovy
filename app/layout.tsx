// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import LayoutWrapper from './layerWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: '  Survey',
  description: 'A project from Ideaiscapital',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <LayoutWrapper>
          {children}
          <ToastContainer position="top-right" autoClose={4000} />
        </LayoutWrapper>
      </body>
    </html>
  );
}
