import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";
import ResumeOne from "./pages/ResumeOne";
import ResumeTwo from "./pages/ResumeTwo";
import ResumeThree from "./pages/ResumeThree";
import rootStore from "@/store";
import { Templates } from "../Template/types";
import Button from "@/containers/Main/components/Button";
import Lottie from "lottie-react";
import LoadingAnimation from "@/../public/lottie/animation_loading.json";
import { useRouter } from "next/router";
import { usePDF } from "react-to-pdf";
import { FaFileDownload } from "react-icons/fa";
import { runInAction } from "mobx";

function Resume() {
  const router = useRouter();
  const {
    TemplateStore: { template },
    ResumeStore: { language, reGenerateResume, getInterviewQuestion },
  } = rootStore;
  const { toPDF, targetRef } = usePDF({ filename: "resume.pdf" });
  const [isLoading, setIsLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const regenerate = async () => {
    setIsLoading(true);
    const res = await reGenerateResume();
    if (res) {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center">
      <Header />
      <div className="flex gap-80 mt-5">
        <Button
          className="p-3 rounded-lg bg-white hover:bg-zinc-200"
          onClick={() => toPDF()}
        >
          <p className="text-lg font-bold">點擊下載履歷</p>
          <FaFileDownload />
        </Button>

        <Button
          isDisabled={isLoading}
          className="p-3 rounded-lg bg-white hover:bg-zinc-200"
          onClick={regenerate}
        >
          <div>
            {isLoading ? (
              <Lottie className="h-7 w-7" animationData={LoadingAnimation} />
            ) : (
              <div className="text-lg font-bold">重新生成</div>
            )}
          </div>
        </Button>
        <div className="flex gap-2">
          <Button
            className="p-3  rounded-lg bg-white hover:bg-zinc-200"
            onClick={async () => {
              setQuestionLoading(true);
              const res = await getInterviewQuestion();
              setQuestionLoading(false);
              if (res) {
                router.push("/Interviewer");
              }
            }}
          >
            <div>
              {questionLoading ? (
                <Lottie className="h-7 w-7" animationData={LoadingAnimation} />
              ) : (
                <div className=" text-lg font-bold ">前往面試官</div>
              )}
            </div>
          </Button>
          <div>
            <select
              className="p-2 border rounded"
              value={language}
              onChange={(e) =>
                runInAction(() => {
                  rootStore.ResumeStore.language = e.target.value;
                })
              }
            >
              <option value="中文">中文</option>
              <option value="英文">英文</option>
            </select>
          </div>
        </div>
      </div>

      {template === Templates.ONE && <ResumeOne ref={targetRef} />}
      {template === Templates.TWO && <ResumeTwo ref={targetRef} />}
      {template === Templates.THREE && <ResumeThree ref={targetRef} />}
    </div>
  );
}

export default observer(Resume);
