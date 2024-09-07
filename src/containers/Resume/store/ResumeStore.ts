import { makeAutoObservable, runInAction } from "mobx";
import { callResume } from "@/api/gemini";
import { IFormData } from "./types";

class ResumeStore {
  introduction: string = "";
  name = "";
  talent: string = "";
  profession: string = "";
  category: string = "";
  mail: string = "";
  phone: string = "";
  address: string = "";
  birthday: string = "";
  workExperience: string = "";
  education: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  generateResume = async (data: IFormData) => {
    try {
      const {
        name,
        talent,
        profession,
        category,
        mail,
        phone,
        education,
        workExperience,
        birthday,
        address,
      } = data;
      console.log(workExperience);

      const res = await callResume(data);
      runInAction(() => {
        this.name = name;
        this.talent = talent;
        this.profession = profession;
        this.category = category;
        this.mail = mail;
        this.education = education;
        this.phone = phone;
        this.workExperience = workExperience;
        this.birthday = birthday;
        this.address = address || "";
      });

      if (res) this.introduction = res;
      return res;
    } catch (error) {
      console.log(error);
    }
  };
}
export default ResumeStore;
