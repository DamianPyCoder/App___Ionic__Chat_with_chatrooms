import { map, size } from "lodash";
import { Message } from "../Message";
import { ListMessagesTypes } from "./ListMessages.types";
import "./ListMessages.scss";

export function ListMessages(props: ListMessagesTypes.Props) {
  const { messages } = props;

  return (
    <div className="list-messages">
      {size(messages) === 0 ? (
        <p className="list-messages__no-messages">
          ¡No hay mensajes, envía el primero!
        </p>
      ) : (
        map(messages, (message) => (
          <Message key={message.id} message={message} />
        ))
      )}
    </div>
  );
}
