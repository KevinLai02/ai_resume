import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";

function Interviewer() {
  const [question, setQuestion] = useState("");
  const fakeList = [
    {
      role: "user",
      text: "how are you?how are you?how are you?how are you?how are you?",
    },
    { role: "AI", text: "Hi I am AI." },
    {
      role: "user",
      text: "how are you?how are you?how are you?how are you?how are you?",
    },
    { role: "AI", text: "Hi I am AI." },
    {
      role: "user",
      text: "how are you?how are you?how are you?how are you?how are you?",
    },
    { role: "AI", text: "Hi I am AI." },
    {
      role: "user",
      text: "how are you?how are you?how are you?how are you?how are you?",
    },
    { role: "AI", text: "Hi I am AI." },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex h-full flex-col items-center justify-between px-40 mt-5">
        <div className="w-full flex flex-1 flex-col items-center gap-5 p-5">
          {fakeList.map((data, index) => {
            return (
              <div
                key={index}
                className={`flex max-w-[60%] p-2 rounded-lg ${data.role === "AI" ? "bg-slate-200 self-start" : "bg-green-300 self-end"}`}
              >
                {data.text}
              </div>
            );
          })}
        </div>
        <div className="flex w-full border-solid border-2 border-black rounded-full px-4 mb-5">
          <textarea
            className="flex flex-1 py-5 px-4 overflow-x-auto rounded-full resize-none overflow-hidden outline-none bg-slate-50"
            rows={1}
            value={question}
            maxLength={300}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          ></textarea>
          <button
            className="h-12 w-12 rounded-full bg-slate-300 self-center text-2xl"
            onClick={() => {
              fakeList.push({ role: "user", text: question });
              setQuestion("");
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
export default observer(Interviewer);
