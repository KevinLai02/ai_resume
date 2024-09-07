import React from "react";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";
import ResumeOne from "./pages/ResumeOne";
import ResumeTwo from "./pages/ResumeTwo";
function Resume() {
  return (
    <div className="flex flex-col flex-1 items-center">
      <Header />
      <ResumeTwo />
    </div>
  );
}

export default observer(Resume);
