import { makeAutoObservable, runInAction } from "mobx";
import { callCompanyAnalyst } from "@/api/analyst";
import { CompanyAnalystT } from "./types";

class Result {
  enterprise_introduce: string[] = [];
  swot_analysis: string[] = [];
  self_introduction: string[] = [];
  error_data: string = "";

  constructor() {
    makeAutoObservable(this);
  }
  companyAnalyst = async ({ company, router }: CompanyAnalystT) => {
    try {
      const res = await callCompanyAnalyst(company);

      const { enterprise_introduce, swot_analysis, self_introduction } =
        res.data;

      if (res) {
        runInAction(() => {
          this.enterprise_introduce = enterprise_introduce.split("\n");
          this.swot_analysis = swot_analysis.split("\n");
          this.self_introduction = self_introduction.split("\n");
        });
      } else {
        return;
      }
      router.push("/analyst/result");
    } catch (error) {
      console.log(error);
    }
  };
}
export default Result;
