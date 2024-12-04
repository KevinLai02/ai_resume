import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function AnalystButton() {
  const router = useRouter();
  return (
    <div
      className="fixed top-32 left-10 right-0 cursor-pointer"
      onClick={() => {
        router.push("/analyst");
      }}
    >
      <Image
        src="/images/analyst_icon.png"
        alt=""
        className="border-4 rounded-xl"
        width={120}
        height={120}
      />
    </div>
  );
}
export default AnalystButton;
