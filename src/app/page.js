import Image from "next/image";

export default function Home() {
  return (
   <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-8 relative">
        <Image 
          src="/profile.jpg" // Path starts from 'public' folder (don't write 'public/')
          alt="Profile Picture"
          width={200}        // Required: Helps browser reserve space
          height={200}       // Required
          className="rounded-full border-4 border-slate-500 shadow-lg"
        />
      </div>
      <h1 className="text-4xl font-bold">Hello, I'm George Udosen - Full Stack Developer</h1>
      <p className="mt-4 text-xl">Welcome to my Next.js Portfolio</p>
    </main>
  );
}
