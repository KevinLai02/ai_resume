import { makeAutoObservable, runInAction } from "mobx";
import {
  callGeminiResume,
  callRefactorWorkExperience,
  callRefactorTalent,
} from "@/api/gemini";
import { callAlpacaResume } from "@/api/api";
import { IFormData } from "./types";
import { callGetInterviewQuestion, callRateAnswer } from "@/api/interviewer";

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
  score: string = "";
  questionArray: string[] = [];
  answerArray: string[] = [];
  language: string = "zh-TW";
  isEditing: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  geminiGenerateResume = async (data: IFormData) => {
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

      const generateIntroduction = await callGeminiResume({
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

  alpacaGenerateResume = async (data: IFormData) => {
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

      const res = await callAlpacaResume({
        talent,
        profession,
        category,
        workExperience,
      });

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

      if (
        res?.data?.introduction &&
        res?.data?.workExperience &&
        res?.data?.talent
      ) {
        runInAction(() => {
          this.introduction = res?.data?.introduction;
          this.workExperience = res?.data?.workExperience;
          this.talent = res?.data?.talent;
        });
        return "ok";
      }
    } catch (error) {
      console.log(error);
    }
  };

  reGenerateResume = async () => {
    try {
      const generateIntroduction = await callGeminiResume({
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
  getInterviewQuestion = async () => {
    try {
      const res = await callGetInterviewQuestion({
        EducationalQualifications: this.education,
        WorkExperience: this.workExperience,
        ProfessionalSkills: this.profession,
        TechnicalField: this.category,
        resumeAutobiography: this.introduction,
      });

      runInAction(() => {
        this.score = "";
        this.questionArray = res.data.llmAnwser;
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  rateAnswer = async () => {
    const res = await callRateAnswer({
      q1: this.questionArray[0],
      a1: this.answerArray[0],
      q2: this.questionArray[1],
      a2: this.answerArray[1],
      q3: this.questionArray[2],
      a3: this.answerArray[2],
      q4: this.questionArray[3],
      a4: this.answerArray[3],
      q5: this.questionArray[4],
      a5: this.answerArray[4],
    });
    runInAction(() => {
      this.score = res.data.RateAnwser;
      this.answerArray = [];
    });
  };
}
export default ResumeStore;
