import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { useStore } from "@/store";
import { IFormData } from "../Resume/store/types";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import LoadingAnimation from "@/../public/lottie/animation_loading.json";
import Header from "@/containers/Main/components/Header";
import Dropdown from "@/components/DropdownList";
import Button from "@/containers/Main/components/Button";
import { SelectChangeEvent } from "@mui/material/Select";
import ModelInformation from "./components/ModelInformation";
import { Model } from "./types";

const array = [
  { id: 1, name: Model.ALPACA },
  { id: 2, name: Model.LLAMA },
  { id: 3, name: Model.GEMINI },
  { id: 4, name: Model.GPT4O },
];

function Form() {
  const router = useRouter();
  const {
    ResumeStore: { generateResume },
  } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState("");
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

  const dropdownChange = (event: SelectChangeEvent) => {
    setModel(event.target.value as string);
  };

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
      <div>
        <Button
          className="min-w-32 mt-5 ml-10 font-bold bg-blue-200 border-none"
          onClick={() => {
            router.push("/template");
          }}
        >
          {"<"} 上一步
        </Button>
      </div>
      <div className="flex flex-col px-10 pb-10">
        <div className="mb-2 flex justify-center">
          <Dropdown
            value={model}
            placeholder="模型選擇"
            list={array}
            handleChange={dropdownChange}
          />
        </div>
        <div className="flex flex-row flex-1">
          <div className="flex-1">
            {model !== "" && <ModelInformation modelName={model} />}
          </div>
          <div className="flex flex-col flex-1 bg-custom-blue-200 items-center p-5 rounded-xl w-[30%] font-bold">
            <p className="text-white text-2xl">填寫以下表格</p>
            <div className="flex flex-col w-full px-10 pb-10 my-4 bg-white rounded-xl">
              <div className="mt-4">
                <p className="text-custom-blue-200 text-base">名稱</p>
                <input
                  className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                  {...register("name", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-base text-custom-red-100">
                  {errors.name && errors.name.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-custom-blue-200 text-base">專業</p>
                <input
                  className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                  {...register("talent", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-base text-custom-red-100">
                  {errors.talent && errors.talent.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-custom-blue-200 text-base">曾經的職位</p>
                <input
                  className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                  {...register("profession", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-base text-custom-red-100">
                  {errors.profession && errors.profession.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-custom-blue-200 text-base">Gmail</p>
                <input
                  className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                  {...register("mail", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-base text-custom-red-100">
                  {errors.mail && errors.mail.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-custom-blue-200 text-base">連絡電話</p>
                <input
                  className="bg-gray-200 w-full border:none rounded-xl p-2 focus:outline-none"
                  {...register("phone", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-base text-custom-red-100">
                  {errors?.phone?.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-custom-blue-200 text-base">產業類別</p>
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
                  <Lottie
                    className="h-7 w-7"
                    animationData={LoadingAnimation}
                  />
                ) : (
                  <div className="text-lg font-bold">開始生成</div>
                )}
              </div>
            </Button>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}

export default observer(Form);
