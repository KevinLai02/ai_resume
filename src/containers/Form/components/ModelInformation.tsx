import React from "react";
import LlmDescribe from "./LlmDescribe";
import AlpacaDescribe from "./AlpacaDescribe";
import OpenAIDescribe from "./OpenAIDescribe";
import GeminiDescribe from "./GeminiDescribe";
import { Model } from "../types";
interface IProps {
  modelName: string;
}

export default function ModelInformation({ modelName }: IProps) {
  return (
    <div className="flex-1">
      <div className="bg-gray-200 m-10 p-10 rounded-lg">
        <div className="flex justify-center border-b-2 border-black pb-3">
          <p className="text-3xl">{modelName}</p>
        </div>
        <div className="mt-3">
          {modelName === Model.LLAMA && <LlmDescribe />}
          {modelName === Model.ALPACA && <AlpacaDescribe />}
          {modelName === Model.GPT4O && <OpenAIDescribe />}
          {modelName === Model.GEMINI && <GeminiDescribe />}
        </div>
      </div>
    </div>
  );
}
