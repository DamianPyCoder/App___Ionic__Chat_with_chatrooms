import { IonContent, IonInput, IonButton } from "@ionic/react";
import { useFormik } from "formik";
import { image } from "../../assets";
import { useAuth } from "../../hooks";
import { initialValues, validationSchema } from "./Login.form";
import "./Login.scss";

export function Login() {
  const { setUsername } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      setUsername(formValue.username);
    },
  });

  return (
    <IonContent class="login-page ion-padding">
      <div className="login-page__image">
        <img src={image.welcome} alt="Entrar" />
      </div>

      <h2>Entra y chatea</h2>

      <IonInput
        placeholder="Nombre de usuario"
        onIonChange={(e) => formik.setFieldValue("username", e.detail.value)}
      />
      {formik.errors.username && (
        <span className="error">{formik.errors.username}</span>
      )}

      <IonButton expand="block" onClick={() => formik.handleSubmit()}>
        Entrar
      </IonButton>
    </IonContent>
  );
}
