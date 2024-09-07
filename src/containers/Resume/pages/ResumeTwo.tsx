import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import AreaTitleTwo from "../components/AreaTitleTwo";
function ResumeTwo() {
  const {
    ResumeStore: {
      introduction,
      name,
      talent,
      profession,
      mail,
      phone,
      address,
    },
  } = useStore();

  return (
    <div className="w-[1200px] h-[1600px] my-10 bg-custom-blue-100">
      <div className="flex bg-custom-blue-400 text-white mt-10">
        <div className="flex flex-col flex-1 items-center my-5">
          <p className="text-6xl my-10">{name}</p>
          <p className="text-2xl mb-5">求職意向: {profession}</p>
        </div>
        <div className="flex flex-col flex-1 gap-6 justify-center ml-5">
          <p className="text-xl">出生年月: </p>
          <p className="text-xl">聯繫電話: {phone}</p>
          <p className="text-xl">電子郵件: {mail}</p>
          <p className="text-xl">聯繫地址: {address}</p>
        </div>
        <div className="flex items-center">
          <p className="bg-custom-blue-500 h-full w-16" />
          <div className="flex w-[250px] justify-center">
            <p className="bg-white w-52 h-52 rounded-full" />
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col items-start px-10 py-12 ">
          <AreaTitleTwo title="教育經歷" />
          <div className="text-xl"></div>
        </div>
        <div className="flex flex-col items-start px-10 py-12 ">
          <AreaTitleTwo title="工作經歷" />
          <div className="text-xl"></div>
        </div>
        <div className="flex flex-col items-start px-10 py-12 ">
          <AreaTitleTwo title="專業技能" />
          <div className="text-xl">{talent}</div>
        </div>
        <div className="flex flex-col items-start px-10 py-12 ">
          <AreaTitleTwo title="自我評價" />
          <div className="text-xl">{introduction}</div>
        </div>
      </div>
    </div>
  );
}

export default observer(ResumeTwo);
