import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex shrink-0 cursor-pointer items-center gap-2.5 transition-transform hover:scale-[1.02]">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={126}
            height={124}
            className="h-auto w-[108px] max-[420px]:w-[92px]"
          />
        </div>
      </Link>
      <div className="flex items-center gap-3 max-[420px]:gap-2">
        <NavItems />
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
