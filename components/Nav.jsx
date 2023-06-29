"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const isUserLoggedIn = true;

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" width={30} height={30} alt="Promptopia Logo" />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Image className=" rounded-full" alt="Profile" width={37} height={37} src="/assets/images/profile.svg" />
          </div>
        ) : (
          <>
            {
              providers &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign in
                </button>
              ))
            }
          </>
        )
        }

      </div>
      <div className="flex sm:hidden relative">
        {isUserLoggedIn ? (
          <div className="flex">

            <Image
              src="/assets/images/logo.svg"
              width={30}
              height={30}
              alt="Profile"
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  My profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  Create Post
                </Link>
                <button type="button" onClick={() => { signOut; setToggleDropdown(false) }} className="w-full mt-5 black_btn">
                  Sign out
                </button>
              </div>
            )}

          </div>
        ) : (
          <>
            {
              providers &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign in
                </button>
              ))
            }
          </>
        )
        }

      </div>
    </nav>
  )
}

export default Nav