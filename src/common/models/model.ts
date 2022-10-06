/**
 * QUIZ - INNER DATA
 */
export interface IInputErrors {
  [key: string]: any;
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

export interface IUserQuestionAnswer {
  id: string;
  answerList: IUserAnswersList[];
  questionName?: string;
  questionType: string | null;
}
export interface IUserAnswersList {
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
