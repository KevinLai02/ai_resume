import { useLocalObservable } from "mobx-react-lite";
const initialState = {
  template: "",
};

const TemplateStore = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialState,
  }));

  return store;
};

export default TemplateStore;
