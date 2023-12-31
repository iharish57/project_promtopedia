"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" width={30} height={30} alt="Promptopedia Logo" />
        <p className="logo_text">Promptopedia</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href="/profile" title="My Profile">
              <Image className=" rounded-full" alt="Profile" width={37} height={37} src={session?.user.image} />
            </Link>
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
      {/* mobile navigation */}
      <div className="flex sm:hidden relative">
        {session?.user ? (
          <div className="flex">

            <Image
              src={session?.user.image}
              width={30}
              height={30}
              alt="Profile"
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
              style={{ cursor: "pointer" }}
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