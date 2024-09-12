import { makeAutoObservable, runInAction } from "mobx";
import {
  callResume,
  callRefactorWorkExperience,
  callRefactorTalent,
} from "@/api/gemini";
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
  avatar: string = "";

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

      const generateIntroduction = await callResume({
        talent,
        profession,
        category,
      });
      const refactoredWorkExperience = await this.refactorWorkExperience(
        workExperience,
        category,
      );
      const refactorTalent = await this.refactorTalent(talent);

      runInAction(() => {
        this.name = name;
        this.profession = profession;
        this.category = category;
        this.mail = mail;
        this.education = education;
        this.phone = phone;
        this.birthday = birthday;
        this.address = address || "";
      });

      if (generateIntroduction && refactoredWorkExperience && refactorTalent) {
        runInAction(() => {
          this.introduction = generateIntroduction;
          this.workExperience = refactoredWorkExperience;
          this.talent = refactorTalent;
        });
        return "ok";
      }
    } catch (error) {
      console.log(error);
    }
  };

  reGenerateResume = async () => {
    try {
      const generateIntroduction = await callResume({
        talent: this.talent,
        profession: this.profession,
        category: this.category,
      });
      const refactoredWorkExperience = await this.refactorWorkExperience(
        this.workExperience,
        this.category,
      );
      const refactorTalent = await this.refactorTalent(this.talent);

      if (generateIntroduction && refactoredWorkExperience && refactorTalent) {
        runInAction(() => {
          this.introduction = generateIntroduction;
          this.workExperience = refactoredWorkExperience;
          this.talent = refactorTalent;
        });
        return "ok";
      }
    } catch (error) {
      console.log(error);
    }
  };

  refactorWorkExperience = async (workExperience: string, category: string) => {
    try {
      const res = await callRefactorWorkExperience(workExperience, category);

      if (res) {
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };

  refactorTalent = async (talent: string) => {
    try {
      const res = await callRefactorTalent(talent);

      if (res) {
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export default ResumeStore;
