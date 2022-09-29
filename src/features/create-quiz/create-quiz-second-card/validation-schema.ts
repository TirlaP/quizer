import * as Yup from "yup";

export let ValidationSchema = Yup.object().shape({
  questionType: Yup.object().required("Question type is required!"),

  questionName: Yup.string().required("Question name is required!"),
});
