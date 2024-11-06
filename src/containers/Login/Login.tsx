import { observer } from "mobx-react-lite";
import React from "react";
import Header from "../Main/components/Header";
import { useForm } from "react-hook-form";
import Button from "@/containers/Main/components/Button";
import { callLogin } from "@/api/api";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await callLogin(data);
  };
  return (
    <div className="flex flex-col flex-1 items-center h-screen">
      <Header />
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col bg-custom-blue-300 items-center p-5 rounded-xl w-[30%] min-w-[510px] font-bold drop-shadow-md">
          <p className="text-white text-2xl">登入</p>
          <div className="flex flex-col w-full px-10 pb-10 my-4 bg-white rounded-xl">
            <div className="mt-10">
              <p className="text-black text-sm">信箱</p>
              <input
                className="w-full border text-sm border-gray-300 rounded-xl p-2 focus:outline-none drop-shadow"
                {...register("email", { required: "*此欄位必填" })}
              />
              <p className="h-5 text-sm text-custom-red-100">
                {errors.email?.message}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-black text-sm">密碼</p>
              <input
                className="w-full border border-gray-300 text-sm rounded-xl p-2 focus:outline-none drop-shadow"
                {...register("password", { required: "*此欄位必填" })}
              />
              <p className="h-5 text-sm text-custom-red-100">
                {errors.password?.message}
              </p>
            </div>
          </div>
          <Button
            className="p-3 rounded-lg bg-white min-w-[350px]"
            onClick={handleSubmit(onSubmit)}
          >
            <div className="text-lg font-bold">登入</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default observer(Login);
