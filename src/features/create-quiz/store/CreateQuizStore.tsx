import { makeAutoObservable, toJS } from "mobx";
import { Question } from "../create-quiz-second-card/create-quiz-second-card";
import uuid from "react-uuid";

export interface QuestionItem {
  id: string;
  question: Question | null;
  completed: boolean;
}

interface SelectedQuestion {
  question: QuestionItem | null;
  isSelected: boolean;
}

export class QuizStoreImpl {
  questions: QuestionItem[] = [];
  selectedQuestion: SelectedQuestion | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addQuestion(question: Question | null, isCorrectResponse: number | null) {
    const item: QuestionItem = {
      id: uuid(),
      question,
      completed: false,
    };

    item.question?.answerList.map((answer, index) =>
      index === isCorrectResponse
        ? (answer.isCorrectAnswer = true)
        : (answer.isCorrectAnswer = false)
    );
    console.log(item);
    this.questions.push(item);
  }

  removeQuestion(id: string) {
    this.questions = this.questions.filter((Question) => Question.id !== id);
    console.log(toJS(this.questions));
  }

  toggleQuestion(id: string) {
    const index = this.questions.findIndex((item) => item.id === id);
    if (index > -1) {
      this.questions[index].completed = !this.questions[index].completed;
    }
  }

  selectQuestion(question: QuestionItem | null) {
    this.selectedQuestion = {
      question: question,
      isSelected: true,
    };
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
