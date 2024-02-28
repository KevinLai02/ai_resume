import React from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore } from "../../store";

function Resume() {
  const router = useRouter()
  const {ResumeStore:{introduction, name, talent, profession}} = useStore()

  return (
    <div className="flex-1">
      <button className="flex justify-center w-20 p-3 border-2 rounded-lg border-sky-600 hover:bg-sky-600" onClick={()=>{
        router.push('/')
      }}>返回</button>
      <div className="flex">
        <div className="font-bold">名稱: </div>
        <div className="ml-2">{name}</div>
      </div>
      <div className="flex">
        <div className="font-bold">專長: </div>
        <div className="ml-2">{talent}</div>
      </div>
      <div className="flex">
        <div className="font-bold">曾經職位: </div>
        <div className="ml-2">{profession}</div>
      </div>
      <div className="mt-5">
        <div className="font-bold">自傳: </div>
        {introduction}
      </div>
    </div>
  );
}

export default observer(Resume);
