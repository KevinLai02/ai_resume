import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import { IFormData } from "../Resume/store/types";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import LoadingAnimation from "@/../public/lottie/animation_loading.json";
function Main() {
  const router = useRouter();
  const {
    ResumeStore: { generateResume },
  } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      talent: "",
      profession: "",
      category: "",
      mail: "",
      phone: "",
    },
  });

  const onSubmit = async (data: IFormData) => {
    setIsLoading(true);
    const res = await generateResume(data);
    if (res) {
      setIsLoading(false);
      router.push("/resume");
    }
  };

  return (
    <div className="flex flex-col flex-1 text-xl">
      <div className="flex py-3 px-10">
        歡迎使用<p className="text-sky-400 font-bold">AI智造坊</p>
      </div>
      <div className="flex flex-col items-center ">
        <div className="flex flex-col border-2 border-orange-200 items-center p-5 rounded-md">
          <p>填寫以下表格</p>
          <div className="flex flex-row">
            <div>
              <div className="m-5">
                <p>名稱</p>
                <input
                  className="border-2 "
                  type="text"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="m-5">
                <p>產業類別</p>
                <input
                  className="border-2 "
                  type="text"
                  {...register("category", { required: true })}
                />
              </div>
              <div className="m-5">
                <p>專業</p>
                <input
                  className="border-2 "
                  type="text"
                  {...register("talent", { required: true })}
                />
              </div>
            </div>
            <div>
              <div className="m-5">
                <p>曾經的職位</p>
                <input
                  className="border-2 "
                  type="text"
                  {...register("profession", { required: true })}
                />
              </div>
              <div className="m-5">
                <p>Gmail</p>
                <input
                  className="border-2 "
                  type="text"
                  {...register("mail", { required: true })}
                />
              </div>
              <div className="m-5">
                <p>連絡電話</p>
                <input
                  className="border-2 "
                  type="text"
                  {...register("phone", { required: true })}
                />
              </div>
            </div>
          </div>
          <button
            className="flex justify-center w-20 p-3 border-2 rounded-lg border-sky-600 hover:bg-sky-600"
            onClick={handleSubmit(onSubmit)}
          >
            <div>
              {isLoading ? (
                <Lottie className="h-5 w-5" animationData={LoadingAnimation} />
              ) : (
                <div className="text-sm">生成</div>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(Main);
