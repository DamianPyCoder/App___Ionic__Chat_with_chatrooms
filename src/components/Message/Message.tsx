import { useIonAlert, useIonToast } from "@ionic/react";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar";
import classNames from "classnames";
import { useAuth } from "../../hooks";
import { openOptions } from "./Message.alert";
import { MessageTypes } from "./Message.types";
import "./Message.scss";

export function Message(props: MessageTypes.Props) {
  const { message } = props;
  const { userId } = useAuth();
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();
  const isMe = message.userId === userId;

  const params = useParams<MessageTypes.Params>();
  const channelId = params.id;

  const onOpenOptions = () => {
    if (isMe) {
      openOptions(presentAlert, channelId, message);
    } else {
      presentToast({
        message: "¡Las opciones solo estas disponibles para tus mensaje!",
        duration: 2500,
        position: "top",
        color: "danger",
      });
    }
  };

  return (
    <div className="message" onClick={onOpenOptions}>
      {!isMe && <Avatar name={message.username} round size="40" />}
      <div className={classNames("message__text", { me: isMe })}>
        {!isMe && <span>{message.username}</span>}
        {message.message}
      </div>
      {isMe && <Avatar name={message.username} round size="40" />}
    </div>
  );
}
