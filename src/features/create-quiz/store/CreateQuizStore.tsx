import { makeAutoObservable, toJS } from "mobx";

export interface QuestionItem {
  id: number;
  title: string;
  completed: boolean;
}

export class QuizStoreImpl {
  questions: QuestionItem[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addQuestion(title: string) {
    const item: QuestionItem = {
      id: +Math.random().toFixed(4),
      title,
      completed: false,
    };
    this.questions.push(item);
  }

  removeQuestion(id: number) {
    this.questions = this.questions.filter((Question) => Question.id !== id);
    console.log(toJS(this.questions));
  }

  toggleQuestion(id: number) {
    const index = this.questions.findIndex((item) => item.id === id);
    if (index > -1) {
      this.questions[index].completed = !this.questions[index].completed;
    }
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
