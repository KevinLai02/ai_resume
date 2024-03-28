import { useLocalObservable } from 'mobx-react-lite';
import { callOpenAIApi } from "@/api/api";
import { IFormData } from './types';
const initialState = {
    introduction: '',
    name: '',
    talent: '',
    profession: '',
    category: '',
    mail: '',
    phone: ''
};

const ResumeStore = () => {
    const store = useLocalObservable(() => ({
        /*observables*/
        ...initialState,
    async generateResume(data:IFormData) {
        const {name, talent, profession, category, mail, phone} = data
        const res = await callOpenAIApi(data)
        const {message:{content}} = res!
        this.name = name
        this.talent = talent
        this.profession = profession
        this.category = category
        this.mail = mail
        this.phone = phone
        if(content) this.introduction = content
        return res
    },
    }));

    return store;
};

export default ResumeStore;
