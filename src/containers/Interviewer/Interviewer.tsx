import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";
import { BsMicFill } from "react-icons/bs";
import rootStore from "@/store";
import { runInAction } from "mobx";
import Lottie from "lottie-react";
import LoadingAnimation from "@/../public/lottie/animation_loading.json";
function Interviewer() {
  const [talkList, setTalkList] = useState<{ role: string; text: string }[]>(
    [],
  );
  const [text, setText] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isReGenerate, setIsReGenerate] = useState<boolean>(false);
  const {
    resumeStore: {
      questionArray,
      score,
      answerArray,
      language,
      rateAnswer,
      getInterviewQuestion,
    },
  } = rootStore;

  useEffect(() => {
    if (questionArray.length > 0) {
      setTalkList([{ role: "AI", text: questionArray[0] }]);
    }
  }, [questionArray]);

  const startRecording = async () => {
    if (isProcessing || isRecording || isSubmitting) return;

    setIsProcessing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setIsRecording(true);

      recorder.onstop = () => recognition?.stop();

      if ("webkitSpeechRecognition" in window) {
        const newRecognition = new window.webkitSpeechRecognition();
        newRecognition.lang = language;
        newRecognition.onresult = (event) => {
          const finalTranscript = Array.from(event.results)
            .filter((result) => result.isFinal)
            .map((result) => result[0].transcript)
            .join(" ");
          if (finalTranscript) setText(finalTranscript);
        };
        newRecognition.onend = () => {
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
  const handleSubmitAnswer = async () => {
    if (isSubmitting) return;

    runInAction(() => answerArray.push(text));

    if (
      currentQuestionIndex <= questionArray.length - 2 &&
      answerArray.length <= 5
    ) {
      setTalkList((prevState) => [
        ...prevState,
        { role: "user", text },
        { role: "AI", text: questionArray[currentQuestionIndex + 1] },
      ]);
      setText("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTalkList((prevState) => [...prevState, { role: "user", text }]);
      setText("");
      setIsSubmitting(true);
      try {
        await rateAnswer();
      } catch (error) {
        console.error("評分過程中出錯:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    if (talkList.length > 0 && talkList[talkList.length - 1].role === "AI") {
      const utterance = new SpeechSynthesisUtterance(
        talkList[talkList.length - 1].text,
      );
      utterance.lang = "zh-TW";
      utterance.rate = 1.5;
      window.speechSynthesis.speak(utterance);
    }
  }, [talkList, language]);

  const reInterview = async () => {
    setIsReGenerate(true);
    runInAction(() => {
      rootStore.resumeStore.score = "";
      rootStore.resumeStore.answerArray = [];
      rootStore.resumeStore.questionArray = [];
    });
    setTalkList([]);
    setCurrentQuestionIndex(0);
    await getInterviewQuestion();
    setIsReGenerate(false);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Header />
      <div className="flex flex-col flex-1 items-center justify-between w-full px-80 py-5">
        <div className="flex flex-1 flex-col items-center gap-5 p-5 w-full overflow-y-scroll basis-0">
          {isReGenerate && (
            <div className="flex gap-5">
              <p>面試問題產生中</p>
              <Lottie className="h-7 w-7" animationData={LoadingAnimation} />
            </div>
          )}

          {talkList.map((data, index) => (
            <div
              key={index}
              className={`flex p-3 break-words word-break rounded-lg overflow-wrap max-w-[60%] ${
                data.role === "AI"
                  ? "bg-slate-200 self-start"
                  : "bg-green-300 self-end"
              }`}
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {data.text}
            </div>
          ))}
        </div>
        <div className="text-lg font-bold">
          {isSubmitting ? (
            <div className="text-red-500">正在評分，請稍等...</div>
          ) : (
            score && (
              <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="flex flex-col items-center bg-yellow-100 p-5 rounded-2xl w-96 h-auto max-h-screen overflow-y-auto">
                  <div className="text-center mb-4">
                    模擬面試已結束，以下是給你的評語
                  </div>
                  <div className="text-lg font-bold mb-6">{score}</div>
                  <div className="flex w-full justify-between">
                    <button
                      onClick={() => {
                        runInAction(() => {
                          rootStore.resumeStore.score = "";
                        });
                      }}
                      className="bg-green-300 px-6 py-3 rounded-xl"
                    >
                      離開
                    </button>
                    <button
                      onClick={reInterview}
                      className="bg-orange-300 px-6 py-3 rounded-xl"
                    >
                      重新出題
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="w-full mt-5">
          <div className="flex w-full border-2 border-black rounded-full px-4 mb-5 bg-slate-100">
            <BsMicFill
              className={`h-6 w-6 cursor-pointer place-self-center ${isRecording ? "text-red-500" : "text-gray-500"}`}
              onClick={startRecording}
            />
            <textarea
              className="flex-1 py-5 px-4 rounded-full bg-transparent outline-none resize-none overflow-hidden"
              rows={1}
              value={text}
              disabled={isRecording || isSubmitting}
              maxLength={300}
              onChange={(e) => setText(e.target.value)}
              style={{ whiteSpace: "pre-wrap", overflowY: "auto" }}
            />
            <button
              className="h-12 w-12 rounded-full bg-slate-200 text-2xl self-center"
              onClick={handleSubmitAnswer}
              disabled={isSubmitting || isReGenerate}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Interviewer);
