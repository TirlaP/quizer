/**
 * QUIZ - INNER DATA
 */
export interface IInputErrors {
  [key: string]: string;
}

export interface IQuestion {
  answerList: IAnswersList[];
  questionName?: string;
  questionType: string | null;
}

export interface IAnswersList {
  isCorrectAnswer?: boolean;
  answerName: string;
}

/**
 * QUIZ - STORE
 */
export interface IQuestionItem {
  id: string;
  question: IQuestion | null;
  completed: boolean;
}

export interface IQuizItem {
  [key: string]: any;
}
