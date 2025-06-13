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
      <body className="font-sansantialiased">
        <div className='md:px-[4rem] md:py-[2rem] lg:w-full max-w-[1500px] flex flex-col justify-center mx-auto' >
<Navbar />

        {children}
        </div>
      </body>
    </html>
  );
}