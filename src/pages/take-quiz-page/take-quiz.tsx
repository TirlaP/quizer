import React, { useEffect, useState } from "react";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";

import { QuizStore } from "../../features/create-quiz/store/CreateQuizStore";
import { toJS } from "mobx";

import { Layout } from "../layout-page/layout";
import { LoadingScreen } from "../../common/components/loading-screen/loading-screen";

import "./take-quiz-page.scss";
import previous_icon from "../../common/assets/previous-icon.svg";

import { QUESTION_TYPES } from "../../common/constants/constant";
import { IQuestionItem, IUserAnswersList } from "../../common/models/model";

interface TakeQuizProps {}

export const TakeQuiz: React.FC<TakeQuizProps> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const quizId = searchParams.get("quizId");

  const navigate = useNavigate();

  const [questions, setQuestions] = useState<IQuestionItem[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<IUserAnswersList[]>(
    []
  );

  const [quizName, setQuizName] = useState("");

  const [index, setIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  const changeCheckedAnswer = (question: any, indexAns: number) => {
    if (
      QuizStore.userAnswers[index]?.questionType === QUESTION_TYPES.SINGLE.value
    ) {
      setQuestionAnswers((currentState) => {
        let arrayCopy = [...currentState];
        arrayCopy = arrayCopy.map((answer, i) => {
          if (i === indexAns) {
            return {
              ...answer,
              isCorrectAnswer: !answer.isCorrectAnswer,
            };
          } else {
            return {
              ...answer,
              isCorrectAnswer: false,
            };
          }
        });

        QuizStore.editUserQuestionAnswer(question.id, {
          ...question,
          id: question.id,
          answerList: [...arrayCopy],
        });
        return arrayCopy;
      });
    } else if (
      questions[index]?.question?.questionType === QUESTION_TYPES.MULTIPLE.value
    ) {
      setQuestionAnswers((currentState) => {
        let arrayCopy = [...currentState];
        arrayCopy[indexAns].isCorrectAnswer =
          !arrayCopy[indexAns].isCorrectAnswer;

        QuizStore.editUserQuestionAnswer(question.id, {
          ...question,
          id: question.id,
          answerList: [...arrayCopy],
        });
        return arrayCopy;
      });
    }
  };

  function changeElement(type: string) {
    if (type === "next") {
      setIndex(index + 1);
      QuizStore.selectActiveQuestion(QuizStore.userAnswers[index + 1]?.id);
    } else {
      setIndex(index - 1);
      QuizStore.selectActiveQuestion(QuizStore.userAnswers[index - 1]?.id);
    }
  }

  const calculateFinalScore = () => {
    let finalScore = 0;
    questions.forEach((question, indexQ) => {
      // Verify if the array of correct answers is equal with the user's answers
      if (
        JSON.stringify(question?.question?.answerList) ===
        JSON.stringify(QuizStore.userAnswers[indexQ].answerList)
      ) {
        finalScore++;
      }
    });
    QuizStore.finalScoreQuiz = finalScore;
  };

  useEffect(() => {
    if (QuizStore.activeQuestion?.answerList) {
      console.log(toJS(QuizStore.activeQuestion?.answerList));
      setQuestionAnswers(
        QuizStore.activeQuestion?.answerList.map((answer) => {
          return {
            ...answer,
            isCorrectAnswer: false,
          };
        })
      );
    }
  }, [QuizStore.activeQuestionId, quizId]);

  useEffect(() => {
    // Check for any selected quiz
    if (quizId) {
      const docRef = doc(db, "quizzes", quizId);

      getDoc(docRef).then((doc) => {
        const docData = doc.data()?.quiz;
        QuizStore.selectQuiz(quizId, "take");
        setQuizName(docData.quizName);
        setQuestions(docData.quizQuestions);

        docData.quizQuestions.forEach((question: any) => {
          const newAnswerList = question.question.answerList.map(
            (answer: any) => {
              return {
                ...answer,
                isCorrectAnswer: false,
              };
            }
          );
          QuizStore.editUserQuestionAnswer(question.id, {
            ...question.question,
            id: question.id,
            answerList: [...newAnswerList],
          });
        });

        QuizStore.selectActiveQuestion(docData.quizQuestions[0]?.id);
        setLoading(false);
      });
    }

    return () => {
      QuizStore.deselectQuiz();
    };
  }, []);

  function getElements(questions: any, index: number) {
    return questions.slice(index, index + 1).map((question: any) => {
      return (
        <Card key={index} className="take-quiz__card">
          <div className="take-quiz__content-wrapper flex flex-column gap-6">
            <div className="take-quiz__header flex flex-column align-items-start">
              <h2>{quizName}</h2>
              <span className="flex text-left">
                You were invited to take part of this awesome quiz. Read
                carefully the questions below and give your best shot.
              </span>
            </div>
            <div className="flex flex-column gap-3 align-items-start">
              <div className="take-quiz__question-name">
                {`${index + 1}. ${question?.questionName}`}
              </div>

              {question.answerList?.map((answer: any, indexAns: number) => (
                <div key={indexAns}>
                  {question.questionType !==
                    QUESTION_TYPES.SUBJECTIVE.value && (
                    <div className="take-quiz__question-response flex">
                      <div className="field-radiobutton mt-2 justify-content-center">
                        {question.questionType ===
                          QUESTION_TYPES.SINGLE.value && (
                          <RadioButton
                            inputId={`answer${indexAns + 1}`}
                            name="isCorrectAnswer"
                            value={`answer${indexAns}`}
                            onChange={() => {
                              changeCheckedAnswer(question, indexAns);
                              console.log(toJS(question));
                            }}
                            checked={answer.isCorrectAnswer || false}
                          />
                        )}

                        {question.questionType ===
                          QUESTION_TYPES.MULTIPLE.value && (
                          <Checkbox
                            inputId={`answer${indexAns + 1}`}
                            name="isCorrectAnswer"
                            value={`answer${indexAns}`}
                            onChange={() =>
                              changeCheckedAnswer(question, indexAns)
                            }
                            checked={answer.isCorrectAnswer || false}
                          />
                        )}

                        <label htmlFor={`answer${indexAns + 1}`}>
                          {answer.answerName}
                        </label>
                      </div>
                    </div>
                  )}

                  {question.questionType ===
                    QUESTION_TYPES.SUBJECTIVE.value && (
                    <InputTextarea
                      style={{ width: "640px" }}
                      className="take-quiz__question-response create-quiz__input"
                      placeholder="Enter your answer"
                      name={"inputText"}
                      value={answer.answerName}
                      onChange={(event) => {
                        answer.answerName = event.target.value;
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="take-quiz__divider" />

            {/* FOOTER */}
            <div className="take-quiz__footer flex flex-row justify-content-between">
              <Button
                disabled={index === 0}
                onClick={() => {
                  changeElement("previous");
                  console.log(toJS(question));
                }}
                className="button__common-style button__take-quiz-previous"
              >
                <img src={previous_icon} alt="previous icon" />
              </Button>

              <div className="flex flex-row align-items-center gap-5">
                {/* PAGE NUMBER */}
                <div className="flex flex-row align-items-center gap-1">
                  {`${index + 1} out of `}
                  <div
                    style={{ fontWeight: "700" }}
                  >{` ${questions.length}`}</div>{" "}
                </div>

                <Button
                  onClick={() => {
                    if (index === questions.length - 1) {
                      calculateFinalScore();
                      navigate({
                        pathname: "/congratulations",
                        search: createSearchParams({
                          quizId: `${quizId}`,
                        }).toString(),
                      });
                    } else {
                      changeElement("next");

                      QuizStore.editUserQuestionAnswer(question.id, {
                        ...question,
                        answerList: questionAnswers,
                      });
                      console.log(toJS(QuizStore.userAnswers));
                    }
                  }}
                  className="button__common-style button__take-quiz-next"
                >
                  {index === questions.length - 1 ? "Submit" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    });
  }

  return (
    <div className="take-quiz button">
      <Layout>
        <div className="flex align-items-center justify-content-center mt-8">
          {/* <button onClick={addElement}>Add item</button> */}
          {loading ? (
            <LoadingScreen loading={loading} />
          ) : (
            getElements(QuizStore.userAnswers, index)
          )}
        </div>
      </Layout>
    </div>
  );
};
