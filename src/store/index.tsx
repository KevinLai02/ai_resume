import MainContext from "../containers/Main/store/MainStore";
import ResumeContext from "../containers/Resume/store/ResumeStore";
import TemplateContext from "../containers/Template/store/TemplateStore";

import React, { createContext, useContext, ReactNode } from "react";

export const RootStoreContext = createContext({} as any);
export const useStore = () => useContext(RootStoreContext);

const RootStore = ({ children }: { children: ReactNode }) => {
  const MainStore = MainContext();
  const ResumeStore = ResumeContext();
  const TemplateStore = TemplateContext();

  return (
    <RootStoreContext.Provider
      value={{
        MainStore,
        ResumeStore,
        TemplateStore,
      }}
    >
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStore;
