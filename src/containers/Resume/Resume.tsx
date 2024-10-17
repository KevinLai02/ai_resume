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
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoReload } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { useRouter } from "next/router";
import { usePDF } from "react-to-pdf";
import { FaFileDownload } from "react-icons/fa";
import { runInAction } from "mobx";
import classNames from "classnames";

function Resume() {
  const router = useRouter();
  const {
    templateStore: { template },
    resumeStore: {
      isEditing,
      language,
      reGenerateResume,
      getInterviewQuestion,
    },
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
      <div className="flex gap-40 mt-5">
        <Button
          isDisabled={isLoading}
          className="p-3 rounded-lg bg-white hover:bg-zinc-200"
          onClick={regenerate}
        >
          <div>
            {isLoading ? (
              <Lottie className="h-7 w-7" animationData={LoadingAnimation} />
            ) : (
              <div className="flex items-center text-lg font-bold">
                <p className="mr-2">重新生成</p>
                <IoReload />
              </div>
            )}
          </div>
        </Button>
        <Button
          className="p-3 rounded-lg bg-white hover:bg-zinc-200"
          onClick={() => {
            runInAction(() => {
              rootStore.resumeStore.isEditing =
                !rootStore.resumeStore.isEditing;
            });
          }}
        >
          <div className="flex items-center text-lg font-bold">
            <p className={classNames(["mr-2", { "text-red-500": isEditing }])}>
              {isEditing ? "儲存編輯" : "編輯內文"}
            </p>
            <MdOutlineModeEdit color={`${isEditing ? "#EF4444" : ""}`} />
          </div>
        </Button>
        <Button
          className="p-5 rounded-lg bg-white hover:bg-zinc-200"
          onClick={() => toPDF()}
        >
          <div className="flex items-center text-lg font-bold">
            <p className="mr-2">點擊下載履歷</p>
            <IoCloudDownloadOutline />
          </div>
          <FaFileDownload />
        </Button>

        <div className="flex gap-2">
          <Button
            className="p-3 rounded-lg bg-white hover:bg-zinc-200"
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
                  rootStore.resumeStore.language = e.target.value;
                })
              }
            >
              <option value="中文">中文</option>
              <option value="英文">英文</option>
            </select>
          </div>
        </div>
      </div>
      <div className="my-5">
        {template === Templates.ONE && <ResumeOne ref={targetRef} />}
        {template === Templates.TWO && <ResumeTwo ref={targetRef} />}
        {template === Templates.THREE && <ResumeThree ref={targetRef} />}
      </div>
    </div>
  );
}

export default observer(Resume);
