import React, { useEffect, useState } from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import Header from "./components/Header";
import Button from "./components/Button";
import rootStore from "@/store";
import Lottie from "lottie-react";
import LoadingAnimation from "@/../public/lottie/animation_loading.json";
import { checkToken } from "@/utils/checkToken";
import AnalystButton from "./components/AnalystButton";

function Main() {
  const router = useRouter();
  const {
    resumeStore: { uploadResume },
  } = rootStore;
  const [questionLoading, setQuestionLoading] = useState(false);
  useEffect(() => {
    checkToken(router);
  }, []);

  return (
    <div className="flex flex-col flex-1 text-xl">
      <div className="fixed top-32 left-10 right-0 ">
        <AnalystButton />
      </div>
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
            className="flex-col bg-custom-blue-300 font-bold text-white py-10"
            onClick={() => {
              router.push("/template");
            }}
          >
            <div className="text-2xl">快速AI履歷生成</div>
            <div className="text-xl">可選擇不同種類之AI模型</div>
          </Button>
          <label
            htmlFor="upload-button"
            className="flex flex-1 flex-col items-center justify-center bg-custom-red-100 mt-10 font-bold text-white py-10 border rounded-2xl cursor-pointer"
          >
            {questionLoading ? (
              <div className="flex flex-col items-center">
                <p>需等待約3~4分鐘，請稍後</p>
                <Lottie className="h-7 w-7" animationData={LoadingAnimation} />
              </div>
            ) : (
              <>
                <div className="text-2xl">上傳個人之履歷PDF檔</div>
                <div className="text-xl">藉由掃描履歷，體驗AI模擬面試</div>
              </>
            )}
          </label>
          <input
            id="upload-button"
            type="file"
            className="hidden"
            onChange={async (e) => {
              setQuestionLoading(true);
              const res = await uploadResume(e);
              if (res) {
                setQuestionLoading(false);
                router.push("/Interviewer");
              }
            }}
          />
        </div>
        <div className="flex flex-1 items-end justify-center pb-20">
          <Image src="/images/robot.png" alt="" height={700} width={700} />
        </div>
      </div>
    </div>
  );
}

export default observer(Main);
