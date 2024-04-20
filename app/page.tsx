import Image from "next/image";
import Navbar from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="w-full">
      <Tabs defaultValue="account"
        className="w-screen"
      >
        <div className=" w-full px-12 py-4
        bg-[#1d202a] text-white
        flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 justify-start items-start">
            <h2 className="font-bold text-lg">Hello, Dr. Johnson!</h2>
            <p>Welcome back, let’s get back to work.</p>
          </div>
        </div>
      </Tabs>
    </main>
  );
}
