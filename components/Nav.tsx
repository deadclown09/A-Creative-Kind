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
  const [mobileNav, setMobileNav] = useState(false);
  const { data: session } = useSession();

  const [authProviders, setAuthProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null>();
  console.log(session?.user?.name);

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
          src="/assets/icons/icon.png"
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
        {session?.user ? (
          <div className="flex justify-center items-center gap-3">
            <Link href="/create-post">
              <button className="black_btn">Create Post</button>
            </Link>

            <button className="outline_btn" onClick={() => signOut()}>
              Sign out
            </button>

            <Link href={`/${session?.user?.name}`}>
              <Image
                src={session.user.image || "/assets/images/profile.svg"}
                alt="User profile"
                height={37}
                width={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {authProviders &&
              Object.values(authProviders).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex justify-center items-center">
            <Image
              src={session.user.image || "/assets/images/profile.svg"}
              alt="User profile"
              height={37}
              width={37}
              className="rounded-full"
              onClick={() => setMobileNav((prev) => !prev)}
            />

            {mobileNav && (
              <div className="dropdown" onClick={() => setMobileNav(false)}>
                <Link
                  href={`/${session?.user?.name}`}
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
                  onClick={() => {
                    setMobileNav(false);
                    signOut();
                  }}
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
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => {
                    setMobileNav(false);
                    signIn(provider.id);
                  }}
                >
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
