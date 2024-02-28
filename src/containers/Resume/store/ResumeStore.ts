import { useLocalObservable } from 'mobx-react-lite';
import { callOpenAIApi } from "@/api/api";
import { IFormData } from './types';
const initialState = {
    introduction: '',
    name: '',
    talent: '',
    profession: '',
    category: ''
};

const ResumeStore = () => {
    const store = useLocalObservable(() => ({
        /*observables*/
        ...initialState,
    async generateResume(data:IFormData) {
        const {name, talent, profession, category} = data
        const res = await callOpenAIApi(data)
        const {message:{content}} = res
        this.name = name
        this.talent = talent
        this.profession = profession
        this.category = category
        if(content) this.introduction = content
        return res
    },
    }));

    return store;
};

export default ResumeStore;
