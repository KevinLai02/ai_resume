import { observer } from "mobx-react-lite";
import React from "react";
import Header from "../Main/components/Header";
import { useForm } from "react-hook-form";
import Button from "@/containers/Main/components/Button";
import { callSignUp } from "@/api/api";
import Link from "next/link";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await callSignUp(data);
  };
  return (
    <div className="flex flex-col flex-1 items-center h-screen">
      <Header />
      <div className="flex flex-col items-center p-5 rounded-xl w-[30%] min-w-[510px] font-bold drop-shadow-md">
        <div className="flex flex-col w-full px-10 pb-10 my-4 bg-white rounded-xl">
          <div className="mt-10">
            <div className="text-3xl font-bold">Sign Up</div>
            <div className="mt-1">
              {"You have account? "}
              <Link href={"/login"} className="underline">
                Click here to login
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-black text-sm">名稱</p>
            <input
              className="w-full text-sm border border-gray-300 rounded-xl px-2 py-3 focus:outline-none"
              {...register("name", { required: "*此欄位必填" })}
            />
            <p className="h-5 text-sm text-custom-red-100">
              {errors.name?.message}
            </p>
          </div>
          <div className="mt-2">
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
            <div className="text-lg font-bold text-white">註冊</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default observer(SignUp);
