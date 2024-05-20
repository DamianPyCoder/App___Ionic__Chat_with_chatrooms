import { MessageModel } from "../../models";

export namespace ListMessagesTypes {
  export type Props = {
    messages: [MessageModel] | [];
  };
}
