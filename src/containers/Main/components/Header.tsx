import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <div className="flex flex-row w-full bg-primary-100 px-16 py-1 items-center justify-between">
      <Link href={"/"}>
        <p className="text-custom-blue-200 font-bold text-2xl">
          AI海事職涯燈塔
        </p>
      </Link>
      <div>
        <Image src="/images/logo.png" alt="" width={90} height={90} />
      </div>
    </div>
  );
}
