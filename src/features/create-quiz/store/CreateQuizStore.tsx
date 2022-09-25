import { makeAutoObservable, toJS } from "mobx";
import { Question } from "../create-quiz-second-card/create-quiz-second-card";
import uuid from "react-uuid";

export interface QuestionItem {
  id: string;
  question: Question | null;
  completed: boolean;
}

export class QuizStoreImpl {
  questions: QuestionItem[] = [];
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

  toggleQuestion(id: string) {
    const index = this.questions.findIndex((item) => item.id === id);
    if (index > -1) {
      this.questions[index].completed = !this.questions[index].completed;
    }
  }

  selectQuestion(question: QuestionItem | null) {
    this.selectedQuestionID = question?.id;
  }

  get selectedQuestion() {
    return this.questions.find(
      (question) => question.id === this.selectedQuestionID
    );
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
