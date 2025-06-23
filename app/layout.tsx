import BackgroundDecor from '@/utils/bgDecor';
import Sroll from './components/desktop/sroll';
import Footer from './components/home/customs/footer';
import Navbar from './components/home/customs/navbar';
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
      <body className="font-sans antialiased">
        
        <div className='relative'>
        <BackgroundDecor />
</div>
        <div className="relative lg:px-[4rem] lg:py-[2rem] lg:w-full max-w-[1500px]
         flex flex-col justify-center mx-auto">
          <Navbar />
          <div className="lg:mt-[5rem] mt-[3rem]">
            {children}
          </div>
        </div>

        <Sroll />
        <div className="pt-6">
          <Footer />
        </div>
      </body>
    </html>
  );
}
