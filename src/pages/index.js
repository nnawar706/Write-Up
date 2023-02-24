import Head from 'next/head'
import { Inter } from '@next/font/google'
import Dashboard from 'src/components/Dashboard';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Write Up</title>
        <meta name="description" content="AI Paragraph Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"bg-black min-h-screen "}>
        
        <div className="flex flex-col items-center justify-center px-4 py-2">
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-400 mt-2.5">
            WRITE UP
            <span className="text-4xl md:text-6xl font-bold text-blue-600">!</span>
          </h1>
          
          <p className="mt-3 text-2xl text-gray-400">
            Want to have an 
            <span className="text-2xl font-bold text-blue-600">
              {" "}
              AI generated paragraph
            </span>
            ? Well, if so, then try me out.
          </p>

        </div>

        <Dashboard />

        <footer className="text-gray-400">
          <hr></hr>
          <p className="text-center mt-2.5">&#169; CodeArc, 2023</p>
        </footer>

      </main>
    </>
  );
}
