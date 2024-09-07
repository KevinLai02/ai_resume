import React from "react";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";
import ResumeOne from "./pages/ResumeOne";
import ResumeTwo from "./pages/ResumeTwo";
import rootStore from "@/store";
import { Templates } from "../Template/types";
function Resume() {
  const {
    TemplateStore: { template },
  } = rootStore;
  return (
    <div className="flex flex-col flex-1 items-center">
      <Header />
      {template === Templates.ONE && <ResumeOne />}
      {template === Templates.TWO && <ResumeTwo />}
    </div>
  );
}

export default observer(Resume);
