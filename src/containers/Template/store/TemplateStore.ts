import { makeAutoObservable } from "mobx";
import { Templates } from "../types";

class TemplateStore {
  template: Templates = Templates.ONE;

  constructor() {
    makeAutoObservable(this);
  }
}
export default TemplateStore;
