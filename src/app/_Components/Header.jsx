
"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Header() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="px-6 lg:px-20 xl:px-28 2xl:px-40 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex justify-start"   onClick={() => {
            router.push("/");
          }}>
        <Image
          
          src="/logo.svg"
          width={230}
          height={120}
          alt="logo"
          className="cursor-pointer"
        
        />
    
          <p className="text-sm md:text-lg font-bold mx-[-100px] ">
    AI Logo Maker
  </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 items-center">
          {user ? (
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
              className="bg-white text-indigo-500 hover:bg-gray-100"
            >
              Dashboard
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/");
              }}
              className="bg-white text-pink-500 hover:bg-gray-100"
            >
              Get Started
            </Button>
          )}
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
