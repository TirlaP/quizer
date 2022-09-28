import * as Yup from "yup";
import { IAnswersList } from "../../../common/models/model";

export let ValidationSchema = Yup.object().shape({
  quizName: Yup.string().required("This field is required!"),

  questionType: Yup.string().required("Question type is required!"),

  questionName: Yup.string().required("Question name is required!"),

  answersList: Yup.array()

    .of(
      Yup.object().shape({
        answerInput: Yup.string().required("This field is required!"),

        isCorrectAnswer: Yup.boolean(),
      })
    )

    .when("questionType", {
      is: (questionType: string) => {
        return questionType === "single";
      },

      then: Yup.array().test(
        "answersList",
        "You must chose the correct answer!",
        (answersList) => {
          const result = !!answersList?.find(
            (answer: IAnswersList) => answer.isCorrectAnswer === true
          );

          if (!result) {
            return new Yup.ValidationError(
              "You must chose the correct answer!",

              "isCheckedError",

              "isCheckedError"
            );
          } else {
            return true;
          }
        }
      ),

      otherwise: Yup.array().test(
        "answersList",

        "You must chose minim 2 correct answers!",

        (answersList) => {
          const result = answersList?.filter(
            (answer: IAnswersList) => answer.isCorrectAnswer === true
          );

          if (result?.length! < 2) {
            return new Yup.ValidationError(
              "You must chose minim 2 correct answers!",

              "isCheckedError",

              "isCheckedError"
            );
          } else {
            return true;
          }
        }
      ),
    }),
});
