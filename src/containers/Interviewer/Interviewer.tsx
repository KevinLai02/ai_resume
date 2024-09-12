import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";
import { BsMicFill } from "react-icons/bs";

function Interviewer() {
  const [talkList, setTalkList] = useState([{ role: "", text: "" }]);
  const [text, setText] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("zh-TW"); // 默認為中文

  // 假數據
  const fakeList = [
    { role: "user", text: "how are you?how are you?how are you?how are you?" },
    { role: "AI", text: "Hi I am AI." },
    { role: "user", text: "how are you?how are you?how are you?how are you?" },
  ];

  useEffect(() => {
    setTalkList(fakeList);
  }, []);

  const startRecording = async () => {
    if (isProcessing || isRecording) return;

    setIsProcessing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      setMediaRecorder(recorder);
      setIsRecording(true);

      recorder.onstop = () => {
        console.log("錄音已停止");
        recognition?.stop();
      };

      if ("webkitSpeechRecognition" in window) {
        const newRecognition = new window.webkitSpeechRecognition();
        newRecognition.lang = language; // 根據選擇的語言設置
        newRecognition.interimResults = false;
        newRecognition.continuous = false;

        newRecognition.onstart = () => {
          console.log("語音識別已啟動");
        };

        newRecognition.onresult = async (event) => {
          console.log("識別結果事件:", event);
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript + " ";
            }
          }

          if (finalTranscript) {
            console.log("識別結果:", finalTranscript);
            setText(finalTranscript);

            try {
              const response = await fetch(
                "http://localhost:8080/api/process-text",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ text: finalTranscript }),
                }
              );

              if (!response.ok) throw new Error("網絡錯誤");

              const data = await response.json();
              console.log("後端回應:", data);
            } catch (error) {
              console.error("發送文字到後端時出錯:", error);
            }
          }
        };

        newRecognition.onerror = (event) => {
          console.error("語音識別出錯:", event.error);
        };

        newRecognition.onend = () => {
          console.log("語音識別結束");
          mediaRecorder?.stop();
          setIsRecording(false);
          setIsProcessing(false);
        };

        setRecognition(newRecognition);
        newRecognition.start();
      } else {
        console.error("Web Speech API 不支援");
      }

      recorder.start();
    } catch (error) {
      console.error("錄音過程中出錯:", error);
      alert("錄音過程中出錯");
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex h-full flex-col items-center justify-between px-40 mt-5">
        <div className="w-full flex flex-1 flex-col items-center gap-5 p-5">
          {talkList.map((data, index) => (
            <div
              key={index}
              className={`flex max-w-[60%] p-2 rounded-lg ${
                data.role === "AI"
                  ? "bg-slate-200 self-start"
                  : "bg-green-300 self-end"
              }`}
            >
              {data.text}
            </div>
          ))}
        </div>
        <div className="flex w-full border-solid border-2 border-black rounded-full px-4 mb-5 relative">
          <BsMicFill
            className={`h-6 w-6 cursor-pointer place-self-center ${isRecording ? "text-red-500" : "text-gray-500"}`}
            onClick={startRecording}
          />
          <textarea
            className="flex flex-1 py-5 px-4 overflow-x-auto rounded-full resize-none overflow-hidden outline-none bg-slate-50"
            rows={1}
            value={text}
            disabled={isRecording}
            maxLength={300}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            className="h-12 w-12 rounded-full bg-slate-300 self-center text-2xl"
            onClick={() => {
              setTalkList((prevState) => [
                ...prevState,
                { role: "user", text: text },
              ]);
              setText("");
            }}
          >
            ↑
          </button>
        </div>
        <div className="flex w-full justify-center mb-5">
          <select
            className="p-2 border rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="zh-TW">中文</option>
            <option value="en-US">英文</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default observer(Interviewer);
