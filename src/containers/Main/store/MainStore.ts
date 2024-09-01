import { makeAutoObservable } from "mobx";
class MainStore {
  userPic: string = "";

  constructor() {
    makeAutoObservable(this);
  }
}
export default MainStore;
