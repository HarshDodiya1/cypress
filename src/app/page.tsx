import { config } from "../../config";

export default function Home() {
  console.log("this is my config file : ", config);;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl sm:text-7xl font-bold">
        Welcome to{" "}
        <a href="https://nextjs.org" className="text-blue-600 hover:underline">
          Next.js!
        </a>
      </h1>
    </div>
  );
}
