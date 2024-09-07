import { makeObservable } from "mobx";
import MainStore from "../containers/Main/store/MainStore";
import ResumeStore from "../containers/Resume/store/ResumeStore";
import TemplateStore from "../containers/Template/store/TemplateStore";

class RootStore {
  MainStore = new MainStore();
  ResumeStore = new ResumeStore();
  TemplateStore = new TemplateStore();
  constructor() {
    makeObservable(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
