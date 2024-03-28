import React from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore } from "../../store";
import Header from "@/components/Header";
import AreaTitle from "./components/AreaTitle";
function Resume() {
  const router = useRouter()
  const {
    ResumeStore:{introduction, name, talent, profession, mail, phone}
  } = useStore()

  return (
    <div className="flex flex-col flex-1 items-center">
      <Header />
      <div className="flex flex-row w-[1200px] h-[1600px] border rounded-lg my-10">
        <div className="flex flex-col w-2/5">
          <div className="flex">
            <div className="bg-main-gray w-12 h-10 rounded-tl-lg"/>
            <div className="flex-1 bg-main-earth h-10"/>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex-1">
              <div className="ml-12">
                <div className="flex flex-col items-center bg-main-earth w-full h-[220px] mb-[200px]">
                  <div className="absolute bg-white rounded-full mt-[50px]">
                    <div className="bg-gray-200 w-[280px] h-[280px] rounded-full m-8"/>
                  </div>
                </div>
                <div className="px-5">
                  <div className="ml-3">
                    <AreaTitle title="contact" iconColor="main-gray"/>
                  </div>
                  <div className="mt-12">
                    <div className="flex flex-row items-center">
                      <div className="flex h-12 w-12 bg-main-gray items-center justify-center">
                        <p className="text-[8px] text-white font-bold">GMAIL</p> 
                      </div>
                      <p className="flex-1 text-2xl ml-7">{mail}</p>
                    </div>
                    <div className="flex flex-row items-center mt-5">
                      <div className="flex h-12 w-12 bg-main-gray items-center justify-center">
                        <p className="text-[8px] text-white font-bold">PHONE</p> 
                      </div>
                      <p className="flex-1 text-2xl ml-7">{phone}</p>
                    </div>
                    <div className="flex flex-row items-center mt-5">
                      <div className="flex h-12 w-12 bg-main-gray items-center justify-center">
                        <p className="text-[8px] text-white font-bold">ADDRESS</p> 
                      </div>
                      <p className="flex-1 text-2xl ml-7">address</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 mt-10 ml-11 bg-main-earth py-5 px-8">
              <AreaTitle title="education" iconColor="main-gray"/>
            </div>
          </div>
          <div className="flex">
            <div className="bg-main-gray w-12 h-10 rounded-bl-lg"/>
            <div className="flex-1 bg-main-earth h-10"/>
          </div>
        </div>
        <div className="flex flex-col flex-1 w-3/5">
          <div className="bg-main-gray w-full h-10 rounded-tr-lg"/>
          <div className="flex flex-col flex-1 px-8">
            <div className="flex-1">
              <div className="border-b-4 pb-5 pt-[100px]">
                <div className="ml-2 text-[60px]">{name}</div>
                <div className="ml-2 text-2xl">{profession}</div>
              </div>
              <div className="mt-5">
                <div className="bg-main-earth py-5 px-5">
                  <AreaTitle title="about me" iconColor="main-gray"/>
                </div>
                <p className="text-xl px-5 pt-10">{introduction}</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-main-earth p-5">
                  <AreaTitle title="experience" iconColor="main-gray"/>
              </div>
              <div className="flex">
                <div className="font-bold">專長: </div>
                <div className="ml-2">{talent}</div>
              </div>
            </div>
          </div>
          <div className="bg-main-gray w-full h-10 rounded-br-lg"/>
        </div>
      </div>
    </div>
  );
}

export default observer(Resume);
