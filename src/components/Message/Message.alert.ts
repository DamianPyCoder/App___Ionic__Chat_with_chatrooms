import { MessageModel } from "../../models";
import { MessageRealtime } from "../../api";

const messageRtController = new MessageRealtime();

export function openOptions(
  presentAlert: any,
  channelId: string,
  message: MessageModel
) {
  presentAlert({
    header: "¿Que quieres hacer?",
    buttons: [
      {
        text: "Editar",
        handler: () => {
          setTimeout(() => {
            editMessage(presentAlert, channelId, message);
          }, 400);
        },
      },
      {
        text: "Eliminar",
        handler: () => {
          setTimeout(() => {
            deleteConfirm(presentAlert, channelId, message.id);
          }, 400);
        },
      },
      {
        text: "Cancelar",
        role: "cancel",
      },
    ],
  });
}

function deleteConfirm(
  presentAlert: any,
  channelId: string,
  messageId: string
) {
  presentAlert({
    header: "¿Seguro que quieres eliminar el mensaje?",
    buttons: [
      {
        text: "Cancelar",
        role: "cancel",
      },
      {
        text: "Eliminar",
        role: "confirm",
        handler: () => {
          messageRtController.delete(channelId, messageId);
        },
      },
    ],
  });
}

function editMessage(
  presentAlert: any,
  channelId: string,
  message: MessageModel
) {
  presentAlert({
    header: "Editando mensaje",
    inputs: [
      {
        placeholder: "Mensaje",
        value: message.message,
      },
    ],
    buttons: [
      {
        text: "Actualizar",
        role: "confirm",
        handler: (e: any) => {
          const newMessage: string = e[0];
          messageRtController.update(channelId, message, newMessage);
        },
      },
    ],
  });
}
