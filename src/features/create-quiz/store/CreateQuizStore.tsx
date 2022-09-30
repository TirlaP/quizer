import { makeAutoObservable, toJS } from "mobx";
import { IQuestion } from "../../../common/models/model";
import uuid from "react-uuid";

import { IQuestionItem, IQuizItem } from "../../../common/models/model";

export class QuizStoreImpl {
  quizzes: IQuizItem[] = [];
  questions: IQuestionItem[] = [];
  selectedQuizID?: string;
  selectedQuestionID?: string;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addQuestion(question: IQuestion | null, correctResponseIndex: number | null) {
    const item: IQuestionItem = {
      id: uuid(),
      question,
      completed: false,
    };

    item.question?.answerList.map((answer, index) =>
      index === correctResponseIndex
        ? (answer.isCorrectAnswer = true)
        : (answer.isCorrectAnswer = false)
    );
    this.questions.push(item);
  }

  editQuestion(questionId: string, updatedQuestion: IQuestion | null) {
    const result = this.questions.find(
      (question) => question.id === questionId
    );
    if (result) {
      result.question = updatedQuestion;
      this.selectQuestion(this.questions[this.questions.length - 1]);
    }
  }

  removeQuestion(id: string) {
    this.questions = this.questions.filter((Question) => Question.id !== id);
  }

  clearQuestions() {
    this.questions = [];
  }

  toggleQuestion(id: string) {
    const index = this.questions.findIndex((item) => item.id === id);
    if (index > -1) {
      this.questions[index].completed = !this.questions[index].completed;
    }
  }

  setQuizzes(fetchedQuizzes: IQuizItem[]) {
    this.quizzes = [...fetchedQuizzes];
  }

  selectQuiz(quizId: string) {
    this.selectedQuizID = quizId;
  }

  addQuiz(quiz: IQuizItem) {
    this.quizzes.push(quiz);
  }

  deselectQuiz() {
    this.deselectQuestion();
    this.clearQuestions();
    this.selectedQuizID = "";
  }

  addEmptyQuestion() {
    const item: IQuestionItem = {
      id: uuid(),
      question: {
        answerList: [
          {
            isCorrectAnswer: false,
            answerName: "",
          },
        ],
        questionName: "",
        questionType: "single",
      },
      completed: false,
    };

    if (!this.isAnyEmptyQuestion) {
      this.questions.push(item);

      this.selectQuestion(item);
    }
  }

  selectQuestion(question: IQuestionItem | null) {
    this.selectedQuestionID = question?.id;
  }
  deselectQuestion() {
    this.selectedQuestionID = "";
  }

  get selectedQuestion() {
    return this.questions.find(
      (question) => question.id === this.selectedQuestionID
    );
  }

  get selectedQuestionIsEmpty() {
    return (
      this.selectedQuestion?.question?.questionName === "" &&
      this.selectedQuestion?.question?.answerList.length === 1
    );
  }
  get isAnyEmptyQuestion() {
    return this.questions.some(
      (question) =>
        question.question?.questionName === "" &&
        question.question?.answerList.length === 1
    );
  }

  get selectedQuiz() {
    return this.quizzes.find((quiz) => quiz.id === this.selectedQuizID);
  }

  get status() {
    let completed = 0,
      remaining = 0;
    this.questions.forEach((Question) => {
      if (Question.completed) {
        completed++;
      } else {
        remaining++;
      }
    });
    return { completed, remaining };
  }
}

export const QuizStore = new QuizStoreImpl();
