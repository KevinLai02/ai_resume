import MainContext from "../containers/Main/store/MainStore";
import ResumeContext from "../containers/Resume/store/ResumeStore";
import InterviewerContext from "@/containers/Interviewer/store/InterviewerStore";
import React, { createContext, useContext, ReactNode } from "react";

export const RootStoreContext = createContext({} as any);
export const useStore = () => useContext(RootStoreContext);

const RootStore = ({ children }: { children: ReactNode }) => {
  const MainStore = MainContext();
  const ResumeStore = ResumeContext();
  const InterviewerStore = InterviewerContext();

  return (
    <RootStoreContext.Provider
      value={{
        MainStore,
        ResumeStore,
        InterviewerStore,
      }}
    >
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStore;
