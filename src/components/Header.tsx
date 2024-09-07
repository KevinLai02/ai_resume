import React from "react";
import { useRouter } from "next/router";
export default function Header() {
  const router = useRouter();
  return (
    <div className="flex flex-row w-full bg-slate-200 py-5 items-center">
      <button
        className="flex justify-center w-20"
        onClick={() => {
          router.push("/");
        }}
      >
        {"<"} 返回
      </button>
      <p className="text-sky-400 font-bold text-xl">AI海事職涯燈塔</p>
    </div>
  );
}
