// app/layout.tsx
import Navbar from './components/home/navbar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans tracking-tight antialiased">
        <div className='md:px-[4rem] md:py-[2rem]' >
<Navbar />

        {children}
        </div>
      </body>
    </html>
  );
}