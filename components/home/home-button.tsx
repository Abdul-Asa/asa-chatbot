"use client";

import { Sign } from "crypto";
import { useSignInModal } from "../layout/sign-in-modal";

export default function CTA({ session }: any) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  return (
    <>
      <SignInModal />
      {session ? (
        <a
          className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
          href={"/chat"}
        >
          <p>Chat now</p>
        </a>
      ) : (
        <button
          className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
          onClick={() => setShowSignInModal(true)}
        >
          <p>Chat now</p>
        </button>
      )}
    </>
  );
}
