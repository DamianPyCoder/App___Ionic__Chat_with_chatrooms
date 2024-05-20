import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { MessageModel } from "../models";

export class MessageRealtime {
  send(channelId: string, message: string, userId: string, username: string) {
    try {
      const db = getDatabase();
      const messageId = uuidv4();

      const messageRef = ref(db, `channel/${channelId}/messages/${messageId}`);
      set(messageRef, {
        id: messageId,
        message,
        userId,
        username,
        created_at: `${new Date()}`,
      });
    } catch (error) {
      throw error;
    }
  }

  getAll(
    channelId: string,
    setMessages: (message: [MessageModel] | []) => void
  ) {
    try {
      const db = getDatabase();
      const messagesRef = ref(db, `channel/${channelId}/messages`);

      onValue(messagesRef, (snapshot) => {
        const dataTemp = snapshot.val();

        if (!dataTemp) {
          setMessages([]);
        } else {
          const data: any = Object.values(dataTemp);
          const response: [MessageModel] = data.sort((a: any, b: any) => {
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          });

          setMessages(response);
        }
      });
    } catch (error) {
      throw error;
    }
  }

  delete(channelId: string, messageId: string) {
    try {
      const db = getDatabase();
      const messageRef = ref(db, `channel/${channelId}/messages/${messageId}`);
      remove(messageRef);
    } catch (error) {
      throw error;
    }
  }

  update(channelId: string, message: MessageModel, newMessage: string) {
    try {
      const db = getDatabase();
      const messageRef = ref(db, `channel/${channelId}/messages/${message.id}`);
      set(messageRef, {
        ...message,
        message: newMessage,
      });
    } catch (error) {
      throw error;
    }
  }
}
