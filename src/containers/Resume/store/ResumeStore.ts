import { makeAutoObservable, runInAction } from "mobx";
import {
  callResume,
  callRefactorWorkExperience,
  callRefactorTalent,
} from "@/api/gemini";
import { IFormData } from "./types";
import { callGetInterviewQuestion } from "@/api/interviewer";

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
        this.getInterviewQuestion();
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
  getInterviewQuestion = async () => {
    try {
      // const res = await callGetInterviewQuestion({
      //   EducationalQualifications: this.education,
      //   WorkExperience: this.workExperience,
      //   ProfessionalSkills: this.profession,
      //   TechnicalField: this.category,
      //   resumeAutobiography: this.introduction,
      // });
      console.log(123);
      const res = await callGetInterviewQuestion({
        EducationalQualifications: "大學畢業",
        WorkExperience: "沒有經驗",
        ProfessionalSkills: "擅長python程式語言",
        TechnicalField: "海事資訊科技系",
        resumeAutobiography:
          "我是一名大學畢業生，主修海事資訊科技系。在大學期間，我不僅掌握了該領域的 專業知識，還積極學習了Python程式語言，並在此方面展現了較強的能力。雖然我目前沒有正式的工作經驗，但在學習過程中， 我參與了多個課程專案，這些專案使我能夠將理論與實踐相結合，並進一步提高了我的技術技能。海事資訊科技是一個多元且 充滿挑戰的領域，結合了資訊技術與海事應用的知識。在學習過程中，我對相關技術和應用有了深刻的理解，並且我發現自己 對使用程式語言解決問題充滿興趣。特別是Python語言，它的靈活性和強大功能讓我能夠快速開發出解決方案，並應用於不同 的技術環境中。儘管我目前缺乏工作經驗，但我相信憑藉我對程式設計的熱忱、扎實的專業基礎以及快速學習新技能的能力， 我能夠在未來的職涯中充分發揮我的潛力。我期望能夠在工作中繼續提升自己，並為公司和團隊帶來有價值的貢獻。",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
}
export default ResumeStore;
