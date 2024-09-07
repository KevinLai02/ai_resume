import React, { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  // eslint-disable-next-line no-undef
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  const startRecording = async () => {
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
        newRecognition.lang = "zh-TW";
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
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ text: finalTranscript }),
                }
              );

              if (!response.ok) {
                throw new Error("網絡錯誤");
              }

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
    }
  };

  // const speakText = (text: string) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   speechSynthesis.speak(utterance);
  // };

  return (
    <div>
      <h1>語音輸入</h1>
      <button onClick={startRecording}>
        {isRecording ? "停止錄音" : "開始錄音"}
      </button>
      <p>轉換的文字: {text}</p>
    </div>
  );
}
