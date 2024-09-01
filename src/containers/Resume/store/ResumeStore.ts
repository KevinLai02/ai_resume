import { makeAutoObservable } from "mobx";
import { callResume } from "@/api/gemini";
import { IFormData } from "./types";

class ResumeStore {
  introduction: String = "";
  name: String = "";
  talent: String = "";
  profession: String = "";
  category: String = "";
  mail: String = "";
  phone: String = "";
  address: String = "";
  birthday: String = "";
  workExperience: String = "";
  education: String = "";

  constructor() {
    makeAutoObservable(this);
  }

  async generateResume(data: IFormData) {
    try {
      const { name, talent, profession, category, mail, phone } = data;
      const res = await callResume(data);
      this.name = name;
      this.talent = talent;
      this.profession = profession;
      this.category = category;
      this.mail = mail;
      this.phone = phone;
      if (res) this.introduction = res;
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
export default ResumeStore;
