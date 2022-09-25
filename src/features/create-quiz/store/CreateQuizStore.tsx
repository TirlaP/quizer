import { makeAutoObservable, toJS } from "mobx";
import { Question } from "../create-quiz-second-card/create-quiz-second-card";
import uuid from "react-uuid";

export interface QuestionItem {
  id: string;
  question: Question | null;
  completed: boolean;
}

export interface QuizItem {
  [key: string]: any;
}

export class QuizStoreImpl {
  quizzes: QuizItem[] = [];
  questions: QuestionItem[] = [];
  selectedQuizID?: string;
  selectedQuestionID?: string;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addQuestion(question: Question | null, correctResponseIndex: number | null) {
    const item: QuestionItem = {
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

  editQuestion(questionId: string, updatedQuestion: Question | null) {
    const result = this.questions.find(
      (question) => question.id === questionId
    );
    if (result) {
      result.question = updatedQuestion;
      this.selectedQuestionID = "";
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

  setFetchedFirebaseQuizzes(fetchedQuizzes: QuizItem[]) {
    this.quizzes = [...fetchedQuizzes];
  }

  selectQuiz(quizId: string) {
    this.selectedQuizID = quizId;
  }
  deselectQuiz() {
    this.selectedQuizID = "";
  }

  selectQuestion(question: QuestionItem | null) {
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

  get selectedQuiz() {
    console.log(toJS(this.quizzes));
    console.log(this.selectedQuestionID);
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
