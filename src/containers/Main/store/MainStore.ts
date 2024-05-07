import { useLocalObservable } from "mobx-react-lite";
const initialState = {
  userPic: "",
};

const MainStore = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialState,
    async getUserId() {
      this.userPic = "";
    },
  }));

  return store;
};

export default MainStore;
