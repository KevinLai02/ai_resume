import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import rootStore from "@/store";
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
import Image from "next/image";
import { runInAction } from "mobx";

const AIModels = [
  { id: 1, name: Model.ALPACA },
  { id: 2, name: Model.LLAMA },
  { id: 3, name: Model.GEMINI },
  { id: 4, name: Model.GPT4O },
];

function Form() {
  const router = useRouter();
  const {
    ResumeStore: { avatar, geminiGenerateResume, alpacaGenerateResume },
  } = rootStore;
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(Model.ALPACA as string);
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
      workExperience: "",
      birthday: "",
      address: "",
      education: "",
    },
  });

  const dropdownChange = (event: SelectChangeEvent) => {
    setModel(event.target.value as string);
  };

  const onSubmit = async (data: IFormData) => {
    setIsLoading(true);
    let res;
    switch (model) {
      case Model.ALPACA:
        res = await alpacaGenerateResume(data);
        break;
      case Model.GEMINI:
        res = await geminiGenerateResume(data);
        break;
    }
    if (res) {
      setIsLoading(false);
      router.push("/resume");
    }
  };

  const uploadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(event.target.files![0]);
    runInAction(() => {
      rootStore.ResumeStore.avatar = file;
    });
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
            list={AIModels}
            handleChange={dropdownChange}
          />
        </div>
        <div className="flex flex-row flex-1">
          <div className="flex-1">
            {model !== "" && <ModelInformation modelName={model} />}
          </div>
          <div className="flex flex-col flex-1 bg-custom-blue-300 items-center p-5 rounded-xl w-[30%] min-w-[510px] font-bold drop-shadow-md">
            <p className="text-white text-2xl">填寫以下表格</p>
            <div className="flex flex-col w-full px-10 pb-10 my-4 bg-white rounded-xl">
              <div className="flex flex-col mt-4 items-center">
                <div className="flex mt-4 justify-center">
                  <label htmlFor="uploadPic">
                    <Image
                      src={avatar || "/images/initial-avatar.png"}
                      alt=""
                      width={90}
                      height={90}
                      className="rounded-full max-w-[90px] max-h-[90px]"
                    />
                  </label>
                  <input
                    id="uploadPic"
                    type="file"
                    className="hidden"
                    onChange={uploadAvatar}
                  />
                </div>
                <div className="text-sm mt-2">上傳頭貼</div>
              </div>
              <div className="mt-2">
                <p className="text-black text-sm">名稱</p>
                <input
                  className="w-full text-sm border border-gray-300 rounded-xl p-2 focus:outline-none drop-shadow"
                  {...register("name", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-sm text-custom-red-100">
                  {errors.name?.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-black text-sm">專業技能</p>
                <input
                  className="w-full border text-sm border-gray-300 rounded-xl p-2 focus:outline-none drop-shadow"
                  {...register("talent", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-sm text-custom-red-100">
                  {errors.talent?.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-black text-sm">工作經歷</p>
                <input
                  className="w-full border border-gray-300 text-sm rounded-xl p-2 focus:outline-none drop-shadow"
                  {...register("workExperience", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-sm text-custom-red-100">
                  {errors.workExperience?.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-black text-sm">學歷</p>
                <input
                  className="w-full border border-gray-300 text-sm rounded-xl p-2 focus:outline-none drop-shadow"
                  {...register("education", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-sm text-custom-red-100">
                  {errors.education?.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-black text-sm">曾經的職位</p>
                <input
                  className="w-full border border-gray-300 text-sm rounded-xl p-2 focus:outline-none drop-shadow"
                  {...register("profession", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-sm text-custom-red-100">
                  {errors.profession?.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-black text-sm">Gmail</p>
                <input
                  className="w-full border border-gray-300 text-sm rounded-xl p-2 focus:outline-none drop-shadow"
                  {...register("mail", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-sm text-custom-red-100">
                  {errors.mail?.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-black text-sm">連絡電話</p>
                <input
                  className="w-full border border-gray-300 text-sm rounded-xl p-2 focus:outline-none drop-shadow"
                  {...register("phone", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-sm text-custom-red-100">
                  {errors.phone?.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-black text-sm">生日</p>
                <input
                  className="w-full border border-gray-300 text-sm rounded-xl p-2 focus:outline-none drop-shadow"
                  {...register("birthday", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-sm text-custom-red-100">
                  {errors.birthday?.message}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-black text-sm">住址</p>
                <input
                  className="w-full border border-gray-300 text-sm rounded-xl p-2 focus:outline-none drop-shadow"
                  {...register("address")}
                />
                <p className="h-5" />
              </div>
              <div className="mt-2">
                <p className="text-black text-sm">產業類別</p>
                <input
                  className="w-full border border-gray-300 text-sm rounded-xl p-2 focus:outline-none drop-shadow"
                  {...register("category", { required: "*此欄位必填" })}
                />
                <p className="h-5 text-sm text-custom-red-100">
                  {errors.category?.message}
                </p>
              </div>
            </div>
            <Button
              isDisabled={!avatar}
              className="p-3 rounded-lg bg-white min-w-[350px]"
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
