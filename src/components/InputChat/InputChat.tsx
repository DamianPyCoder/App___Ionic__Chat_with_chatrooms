import { useState, useEffect } from "react";
import { IonInput, IonIcon } from "@ionic/react";
import { send } from "ionicons/icons";
import { useFormik } from "formik";
import { MessageRealtime } from "../../api";
import { useAuth } from "../../hooks";
import { initialValues, validationSchema } from "./InputChat.form";
import { InputChatTypes } from "./InputChat.types";
import "./InputChat.scss";

const messageRtController = new MessageRealtime();

export function InputChat(props: InputChatTypes.Props) {
  const { channelId } = props;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { userId, username } = useAuth();

  useEffect(() => {
    window.addEventListener("ionKeyboardDidShow", (event: any) => {
      const { keyboardHeight } = event.detail;
      setKeyboardHeight(keyboardHeight - 15);
    });

    window.addEventListener("ionKeyboardDidHide", () => {
      setKeyboardHeight(0);
    });
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      try {
        messageRtController.send(
          channelId,
          formValue.message,
          userId,
          username
        );
        formik.handleReset(null);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div
      className="input-chat"
      style={{ transform: `translateY(-${keyboardHeight}px)` }}
    >
      <IonInput
        placeholder="Tu mensaje..."
        value={formik.values.message}
        onIonChange={(e) => formik.setFieldValue("message", e.detail.value)}
      />
      <IonIcon icon={send} onClick={() => formik.handleSubmit()} />
    </div>
  );
}
