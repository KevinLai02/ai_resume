import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import { IFormData } from "../store/types";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import LoadingAnimation from "@/../public/lottie/animation_loading.json";
import Header from "@/containers/Main/components/Header";
// import Input from "../components/Input";
import Button from "@/containers/Main/components/Button";

function Form() {
  const router = useRouter();
  const {
    ResumeStore: { generateResume },
  } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
  console.log(errors);

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
      <Header />
      <div className="flex flex-col items-center p-10">
        <div className="flex flex-col bg-custom-blue-200 items-center p-5 rounded-xl w-[30%] font-bold">
          <p className="text-white text-2xl">填寫以下表格</p>
          <div className="flex flex-col w-full px-10 pb-10 my-4 bg-white rounded-xl">
            <div className="mt-4">
              <p className="text-custom-blue-200">名稱</p>
              <input
                className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                {...register("name", { required: "*此欄位必填" })}
              />
              <p className="h-5 text-base text-custom-red-100">
                {errors.name && errors.name.message}
              </p>
            </div>
            <div className="mt-8">
              <p className="text-custom-blue-200">專業</p>
              <input
                className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                {...register("talent", { required: "*此欄位必填" })}
              />
              <p className="h-5 text-base text-custom-red-100">
                {errors.talent && errors.talent.message}
              </p>
            </div>
            <div className="mt-8">
              <p className="text-custom-blue-200">曾經的職位</p>
              <input
                className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                {...register("profession", { required: "*此欄位必填" })}
              />
              <p className="h-5 text-base text-custom-red-100">
                {errors.profession && errors.profession.message}
              </p>
            </div>
            <div className="mt-8">
              <p className="text-custom-blue-200">Gmail</p>
              <input
                className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                {...register("mail", { required: "*此欄位必填" })}
              />
              <p className="h-5 text-base text-custom-red-100">
                {errors.mail && errors.mail.message}
              </p>
            </div>
            <div className="mt-8">
              <p className="text-custom-blue-200">連絡電話</p>
              <input
                className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                {...register("phone", { required: "*此欄位必填" })}
              />
              <p className="h-5 text-base text-custom-red-100">
                {errors?.phone?.message}
              </p>
            </div>
            <div className="mt-8">
              <p className="text-custom-blue-200">產業類別</p>
              <input
                className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                {...register("category")}
              />
            </div>
          </div>
          <Button
            className="p-3 rounded-lg bg-white"
            onClick={handleSubmit(onSubmit)}
          >
            <div>
              {isLoading ? (
                <Lottie className="h-5 w-5" animationData={LoadingAnimation} />
              ) : (
                <div className="text-lg font-bold">開始生成</div>
              )}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default observer(Form);
