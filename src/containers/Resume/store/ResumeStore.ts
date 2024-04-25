import { useLocalObservable } from 'mobx-react-lite';
import { callResume } from "@/api/api";
import { IFormData } from './types';
const initialState = {
    introduction: '',
    name: '',
    talent: '',
    profession: '',
    category: '',
    mail: '',
    phone: '',
    address: ''
};

const ResumeStore = () => {
    const store = useLocalObservable(() => ({
        /*observables*/
        ...initialState,
    async generateResume(data:IFormData) {
        try {
            const {name, talent, profession, category, mail, phone} = data
            const res = await callResume(data)
            this.name = name
            this.talent = talent
            this.profession = profession
            this.category = category
            this.mail = mail
            this.phone = phone
            if(res) this.introduction = res
            return res
        } catch (error) {
            console.log(error);
        }
    },
    }));

    return store;
};

export default ResumeStore;
