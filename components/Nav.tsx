"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

const Nav = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  const [authProviders, setAuthProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setAuthProviders(response);
    };
    setProviders();
  }, []);

  return (
    <nav className="flex justify-between items-center w-full pt-4 mb-6">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/assets/images/logo.svg"
          alt="A Creative Kind Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="font-bold text-lg text-primary-black text-center">
          A Creative Kind
        </p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex justify-center items-center gap-3">
            <Link href="/create-post">
              <button className="black_btn">Create Post</button>
            </Link>

            <button className="outline_btn">Sign out</button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                alt="User profile"
                height={37}
                width={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {authProviders &&
              Object.values(authProviders).map((provider) => (
                <button type="button" key={provider.name} className="black_btn">
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex justify-center items-center">
            <Image
              src="/assets/images/logo.svg"
              alt="User profile"
              height={37}
              width={37}
              onClick={() => setMobileNav((prev) => !prev)}
            />

            {mobileNav && (
              <div className="dropdown" onClick={() => setMobileNav(false)}>
                <Link
                  href="profile"
                  onClick={() => setMobileNav(false)}
                  className="dropdown_link"
                >
                  My Profile
                </Link>
                <Link
                  href="/create-post"
                  onClick={() => setMobileNav(false)}
                  className="dropdown_link"
                >
                  Create Post
                </Link>
                <button
                  className="black_btn mt-2 w-full"
                  onClick={() => setMobileNav(false)}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {authProviders &&
              Object.values(authProviders).map((provider) => (
                <button type="button" key={provider.name} className="black_btn">
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
