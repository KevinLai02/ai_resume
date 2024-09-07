import { useLocalObservable } from "mobx-react-lite";
const initialState = {
  question: "",
};
const InterviewerViewStore = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialState,
  }));

  return store;
};
export default InterviewerViewStore;
