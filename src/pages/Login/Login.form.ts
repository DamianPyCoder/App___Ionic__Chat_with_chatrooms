import * as Yup from "yup";

export function initialValues() {
  return {
    username: "",
  };
}

export function validationSchema() {
  return Yup.object({
    username: Yup.string().required("Nombre de usuario obligatorio"),
  });
}
