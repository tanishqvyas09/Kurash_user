"use client";

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const ClerkAuth = () => {
  return (
    <div className="absolute top-4 right-4 z-50 flex gap-2 items-center">
      <SignedIn>
        <UserButton redirectUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </div>
  );
};

export default ClerkAuth; 