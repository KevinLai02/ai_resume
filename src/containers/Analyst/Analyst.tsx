import React, { useState } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import rootStore from "@/store";
import Lottie from "lottie-react";
import Loading from "@/../public/lottie/animation_loading.json";
import Header from "../Main/components/Header";

function Analyst() {
  const {
    analystStore: { companyAnalyst },
  } = rootStore;
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false); // 加載狀態
  const router = useRouter();

  const handleAnalyze = async () => {
    setLoading(true);
    await companyAnalyst({ company: userInput, router });
    setLoading(false);
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center p-10 bg-custom-yellow-200 rounded-lg shadow">
          <span className="text-2xl font-bold">AI企業分析師</span>
          <div className="flex items-center mt-5 text-xl">
            <select
              className=""
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            >
              <option value="" disabled>
                請選擇企業名稱
              </option>
              <option value="長榮海運">長榮海運</option>
              <option value="陽明海運">陽明海運</option>
              <option value="萬海航運">萬海航運</option>
            </select>

            <button
              onClick={handleAnalyze}
              disabled={loading || !userInput}
              className={`${loading || !userInput ? "bg-gray-300" : "bg-white"} ml-3 py-2 px-4 rounded-lg shadow`}
            >
              {loading ? (
                <Lottie animationData={Loading} className="w-12 h-6" />
              ) : (
                <div className="font-bold text-base px-2">分析</div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default observer(Analyst);
