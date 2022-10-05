import * as Yup from "yup";

export let ValidationSchema = Yup.object().shape({
  questionName: Yup.string().required("Question name is required!"),
});
