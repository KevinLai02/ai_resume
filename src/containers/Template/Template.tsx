import React from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Header from "@/containers/Main/components/Header";
import Link from "next/link";
import { runInAction } from "mobx";
import rootStore from "@/store";
import { Templates } from "./types";

function Template() {
  return (
    <div className="flex flex-col flex-1 text-xl">
      <Header />
      <div className="flex w-full justify-center font-bold mt-5">
        <p>請選擇一種履歷模板</p>
      </div>
      <div className="flex p-10 justify-center">
        <Link
          href="/form"
          className="flex flex-1 justify-center"
          onClick={() => {
            runInAction(() => {
              rootStore.templateStore.template = Templates.ONE;
            });
          }}
        >
          <Image src="/images/template1.png" alt="" height={300} width={300} />
        </Link>
        <Link
          href="/form"
          className="flex flex-1 justify-center"
          onClick={() => {
            runInAction(() => {
              rootStore.templateStore.template = Templates.TWO;
            });
          }}
        >
          <Image src="/images/template2.png" alt="" height={300} width={300} />
        </Link>
        <Link
          href="/form"
          className="flex flex-1 justify-center"
          onClick={() => {
            runInAction(() => {
              rootStore.templateStore.template = Templates.THREE;
            });
          }}
        >
          <Image src="/images/template3.png" alt="" height={300} width={300} />
        </Link>
      </div>
    </div>
  );
}

export default observer(Template);
