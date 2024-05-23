import { useLocalObservable } from "mobx-react-lite";
const initialState = {
  question: "",
};
const InterviewerStore = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialState,
  }));

  return store;
};
export default InterviewerStore;
