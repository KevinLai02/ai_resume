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
import { usePDF } from "react-to-pdf";
import { FaFileDownload } from "react-icons/fa";

function Resume() {
  const {
    TemplateStore: { template },
    ResumeStore: { reGenerateResume },
  } = rootStore;
  const { toPDF, targetRef } = usePDF({ filename: "resume.pdf" });
  const [isLoading, setIsLoading] = useState(false);

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
      <Button className="p-3 mt-5 rounded-lg bg-white" onClick={() => toPDF()}>
        <p className="font-bold">點擊下載履歷</p>
        <FaFileDownload />
      </Button>
      <Button
        isDisabled={isLoading}
        className="p-3 mt-5 rounded-lg bg-white"
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
      {template === Templates.ONE && <ResumeOne ref={targetRef} />}
      {template === Templates.TWO && <ResumeTwo ref={targetRef} />}
      {template === Templates.THREE && <ResumeThree ref={targetRef} />}
    </div>
  );
}

export default observer(Resume);
