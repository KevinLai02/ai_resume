import { observer } from "mobx-react-lite";
import React from "react";
import Header from "../Main/components/Header";
import { useForm } from "react-hook-form";
import Button from "@/containers/Main/components/Button";
import { callLogin } from "@/api/api";
import Link from "next/link";

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
      <div className="flex flex-col items-center p-5 rounded-xl w-[30%] min-w-[510px] font-bold drop-shadow-md">
        <div className="flex flex-col w-full px-10 pb-10 my-4 bg-white rounded-xl">
          <div className="mt-10">
            <div className="text-3xl font-bold">Login</div>
            <div className="mt-1">
              {"You don't have account? "}
              <Link href={"/signup"} className="underline">
                Click here to signup
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-black text-sm">信箱</p>
            <input
              className="w-full border text-sm border-gray-300 rounded-xl px-2 py-3 focus:outline-none"
              {...register("email", { required: "*此欄位必填" })}
            />
            <p className="h-5 text-sm text-custom-red-100">
              {errors.email?.message}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-black text-sm">密碼</p>
            <input
              className="w-full border border-gray-300 text-sm rounded-xl px-2 py-3 focus:outline-none"
              {...register("password", { required: "*此欄位必填" })}
            />
            <p className="h-5 text-sm text-custom-red-100">
              {errors.password?.message}
            </p>
          </div>
          <Button
            className="mt-5 p-3 rounded-full bg-purple-600	min-w-[350px]"
            onClick={handleSubmit(onSubmit)}
          >
            <div className="text-lg font-bold text-white">登入</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default observer(Login);
