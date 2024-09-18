import React from "react";
import { observer } from "mobx-react-lite";
import rootStore from "@/store";
import { GrHomeRounded, GrMail, GrPhone } from "react-icons/gr";
import Image from "next/image";

function ResumeThree() {
  const {
    ResumeStore: {
      introduction,
      name,
      talent,
      mail,
      phone,
      address,
      education,
      workExperience,
      avatar,
    },
  } = rootStore;

  return (
    <div className="flex flex-col w-[1200px] h-[1600px] my-10 bg-white">
      <div className="flex flex-col items-center bg-custom-brown-100 w-full h-[550px] p-7">
        <div className="flex w-[250px] justify-center mt-2">
          {avatar ? (
            <Image
              src={avatar}
              alt=""
              height={208}
              width={208}
              className="rounded-full m-8 max-h-[208px] max-w-[208px] min-h-[208px] min-w-[208px]"
            />
          ) : (
            <p className="bg-white rounded-full m-8 max-h-[208px] max-w-[208px] min-h-[208px] min-w-[208px]" />
          )}
        </div>
        <p className="text-4xl font-bold text-white">{name}</p>
        <div className="text-xl text-white px-12 mt-3">{introduction}</div>
        <div className="flex justify-between ml-5 w-full px-12 mt-5">
          <div className="flex items-center">
            <GrPhone size={20} />
            <p className="text-xl ml-2 text-white">{phone}</p>
          </div>
          <div className="flex items-center">
            <GrMail size={20} />
            <p className="text-xl ml-2 text-white">{mail}</p>
          </div>
          {address && (
            <div className="flex items-center">
              <GrHomeRounded size={20} />
              <p className="text-xl ml-2 text-white">{address}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 px-10">
        <div className="flex flex-col flex-1 items-start py-12 ">
          <p className="text-custom-blue-400 text-3xl font-bold">工作經歷</p>
          <div className="text-xl">{workExperience}</div>
        </div>
        <div className="flex flex-col items-start py-12 ">
          <p className="text-custom-blue-400 text-3xl font-bold">教育經歷</p>
          <div className="text-xl">{education}</div>
        </div>
      </div>
      <div className="flex flex-col bg-custom-brown-100 w-full h-[350px] px-10">
        <div className="flex flex-col items-start py-10">
          <p className="text-white text-3xl font-bold">專業技能</p>
          <div className="text-xl mt-12 text-white">{talent}</div>
        </div>
      </div>
    </div>
  );
}

export default observer(ResumeThree);
