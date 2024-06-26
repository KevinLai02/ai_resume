import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
function Main() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 text-xl">
      <div className="flex py-3 px-10">
        歡迎使用<p className="text-sky-400 font-bold">AI智造坊</p>
      </div>
    </div>
  );
}

export default observer(Main);
