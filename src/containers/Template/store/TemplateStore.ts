import { useLocalObservable } from "mobx-react-lite";
import { Templates } from "../types";
const initialState = {
  template: Templates.ONE,
};

const TemplateStore = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialState,
  }));

  return store;
};

export default TemplateStore;
