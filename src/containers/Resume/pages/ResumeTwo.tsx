import React, { forwardRef } from "react";
import { observer } from "mobx-react-lite";
import rootStore from "@/store";
import AreaTitleTwo from "../components/AreaTitleTwo";
import Image from "next/image";
import { runInAction } from "mobx";
import TextArea from "../components/TextArea";

const ResumeTwo = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    ResumeStore: {
      introduction,
      name,
      talent,
      profession,
      mail,
      phone,
      address,
      education,
      workExperience,
      birthday,
      avatar,
      isEditing,
    },
  } = rootStore;

  return (
    <div className="w-[1190px] h-[1682px] bg-custom-blue-100" ref={ref}>
      <div className="flex bg-custom-blue-400 text-white mt-10">
        <div className="flex flex-col flex-1 items-center my-5">
          <p className="text-6xl my-10">{name}</p>
          <div className="text-2xl mb-5">
            {isEditing ? (
              <TextArea
                className="text-2xl text-center"
                value={profession}
                rows={1}
                onChange={(e) => {
                  runInAction(() => {
                    rootStore.ResumeStore.profession = e.target.value;
                  });
                }}
              />
            ) : (
              <pre className="text-2xl text-wrap">{profession}</pre>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-6 justify-center ml-5">
          <p className="text-xl">出生年月: {birthday}</p>
          <p className="text-xl">聯繫電話: {phone}</p>
          <p className="text-xl">電子郵件: {mail}</p>
          <p className="text-xl">聯繫地址: {address}</p>
        </div>
        <div className="flex items-center">
          <p className="bg-custom-blue-500 h-full w-16" />
          <div className="flex w-[250px] justify-center">
            {avatar ? (
              <Image
                src={avatar}
                alt=""
                height={208}
                width={208}
                className="rounded-full m-8 max-h-[208px] max-w-[208px] min-h-[208px] min-w-[208px]"
              />
            ) : (
              <p className="bg-white w-52 h-52 rounded-full" />
            )}
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col items-start px-10 py-12 ">
          <AreaTitleTwo title="教育經歷" />
          {isEditing ? (
            <TextArea
              className="text-xl"
              value={education}
              rows={6}
              onChange={(e) => {
                runInAction(() => {
                  rootStore.ResumeStore.education = e.target.value;
                });
              }}
            />
          ) : (
            <pre className="text-xl text-wrap">{education}</pre>
          )}
        </div>
        <div className="flex flex-col items-start px-10 py-12 ">
          <AreaTitleTwo title="工作經歷" />
          {isEditing ? (
            <TextArea
              className="text-xl"
              value={workExperience}
              rows={10}
              onChange={(e) => {
                runInAction(() => {
                  rootStore.ResumeStore.workExperience = e.target.value;
                });
              }}
            />
          ) : (
            <pre className="text-xl text-wrap">{workExperience}</pre>
          )}
        </div>
        <div className="flex flex-col items-start px-10 py-12 ">
          <AreaTitleTwo title="專業技能" />
          {isEditing ? (
            <TextArea
              className="text-xl"
              value={talent}
              rows={10}
              onChange={(e) => {
                runInAction(() => {
                  rootStore.ResumeStore.talent = e.target.value;
                });
              }}
            />
          ) : (
            <pre className="text-xl text-wrap">{talent}</pre>
          )}
        </div>
        <div className="flex flex-col items-start px-10 py-12 ">
          <AreaTitleTwo title="自我評價" />
          {isEditing ? (
            <TextArea
              className="text-xl"
              value={introduction}
              rows={10}
              onChange={(e) => {
                runInAction(() => {
                  rootStore.ResumeStore.introduction = e.target.value;
                });
              }}
            />
          ) : (
            <pre className="text-xl text-wrap">{introduction}</pre>
          )}
        </div>
      </div>
    </div>
  );
});
ResumeTwo.displayName = "ResumeTwo";
export default observer(ResumeTwo);
