import React from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import Header from "./components/Header";
import Button from "./components/Button";
function Main() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 text-xl">
      <Header />
      <div className="flex py-3 px-10 text-3xl justify-center font-bold">
        可選擇以下方式打造您的履歷
      </div>
      <div className="flex h-[80vh] px-10">
        <div className="flex flex-1 items-end justify-center pb-20">
          <Image src="/images/lighthouse.png" alt="" height={700} width={700} />
        </div>
        <div className="flex flex-1 flex-col w-[30%] py-20 px-32">
          <Button
            className="flex-col bg-custom-blue-200 font-bold text-white py-10"
            onClick={() => {
              router.push("/resume/form");
            }}
          >
            <div className="text-2xl">快速AI履歷生成</div>
            <div className="text-xl">可選擇不同種類之AI模型</div>
          </Button>
          <Button
            className="flex-col bg-custom-red-100 mt-10 font-bold text-white py-10"
            onClick={() => {}}
          >
            <div className="text-2xl">上傳有關個人之PDF檔</div>
            <div className="text-xl">藉由掃描PDF檔，生成更個性化的履歷</div>
          </Button>
        </div>
        <div className="flex flex-1 items-end justify-center pb-20">
          <Image src="/images/robot.png" alt="" height={700} width={700} />
        </div>
      </div>
    </div>
  );
}

export default observer(Main);
