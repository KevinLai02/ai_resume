import React, { useState } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import rootStore from "@/store";
import classNames from "classnames";
import Header from "@/containers/Main/components/Header";

function AnalyzePage() {
  const {
    analystStore: { enterprise_introduce, self_introduction, swot_analysis },
  } = rootStore;
  const router = useRouter();

  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [showAnalysisSummary, setShowAnalysisSummary] = useState(false);
  const [showSelfIntroduction, setShowSelfIntroduction] = useState(false);

  return (
    <div className="bg-white">
      <Header />
      <div className="w-1/2 min-w-[600px] mx-auto p-5 bg-primary-main-earth border rounded-lg my-5">
        <h1 className="text-2xl font-bold text-center mb-5 bg-custom-blue-200 p-4 rounded-xl">
          企業分析報告
        </h1>
        <hr className="my-5" />

        {/* 公司簡介部分 */}
        <div className="mb-5">
          <div
            className="max-w-[200px] text-center bg-custom-yellow-100 p-4 rounded-2xl mx-auto cursor-pointer transition-all duration-700 ease-in font-bold"
            onClick={() => setShowCompanyInfo(!showCompanyInfo)}
          >
            公司簡介
          </div>
          <div
            className={classNames([
              "overflow-hidden transform transition-all duration-500 ease-in-out",
              {
                "max-h-[600vh] opacity-100 translate-y-0": showCompanyInfo,
                "max-h-0 opacity-0 -translate-y-2": !showCompanyInfo,
              },
            ])}
          >
            {enterprise_introduce.length > 0 ? (
              enterprise_introduce.map((line: string, index: number) => (
                <blockquote key={index} className="text-base italic p-4 my-2">
                  {line}
                </blockquote>
              ))
            ) : (
              <p>沒有找到相關分析摘要。</p>
            )}
          </div>
        </div>

        {/* 分析摘要部分 */}
        <div className="mb-5">
          <div
            className="max-w-[200px] text-center bg-custom-yellow-100 p-4 rounded-2xl mx-auto cursor-pointer transition-all duration-700 ease-in font-bold"
            onClick={() => setShowAnalysisSummary(!showAnalysisSummary)}
          >
            分析摘要
          </div>
          <div
            className={classNames([
              "overflow-hidden transform transition-all duration-500 ease-in-out",
              {
                "max-h-[600vh] opacity-100 translate-y-0": showAnalysisSummary,
                "max-h-0 opacity-0 -translate-y-2": !showAnalysisSummary,
              },
            ])}
          >
            {swot_analysis.length > 0 ? (
              swot_analysis.map((line: string, index: number) => (
                <blockquote key={index} className="text-base italic p-4 my-2">
                  {line}
                </blockquote>
              ))
            ) : (
              <p>沒有找到相關分析摘要。</p>
            )}
          </div>
        </div>

        {/* 自我介紹部分 */}
        <div className="mb-5">
          <div
            className="max-w-[200px] text-center bg-custom-yellow-100 p-4 rounded-2xl mx-auto cursor-pointer transition-all duration-700 ease-in font-bold"
            onClick={() => setShowSelfIntroduction(!showSelfIntroduction)}
          >
            自我介紹建議
          </div>
          <div
            className={classNames([
              "overflow-hidden transform transition-all duration-500 ease-in-out",
              {
                "max-h-[600vh] opacity-100 translate-y-0": showSelfIntroduction,
                "max-h-0 opacity-0 -translate-y-2": !showSelfIntroduction,
              },
            ])}
          >
            {self_introduction.length > 0 ? (
              self_introduction.map((line: string, index: number) => (
                <blockquote key={index} className="text-base italic p-4 my-2">
                  {line}
                </blockquote>
              ))
            ) : (
              <p>沒有找到相關分析摘要。</p>
            )}
          </div>
        </div>

        <hr className="my-5" />

        {/* 返回首頁按鈕 */}
        <button
          className="bg-custom-green text-white px-5 py-2.5 border-none rounded-md cursor-pointer block mx-auto"
          onClick={() => router.push("/")}
        >
          返回首頁
        </button>
      </div>
    </div>
  );
}

export default observer(AnalyzePage);
