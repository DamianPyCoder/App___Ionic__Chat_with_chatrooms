import { MessageModel } from "../../models";

export namespace MessageTypes {
  export type Props = {
    message: MessageModel;
  };

  export type Params = {
    id: string;
  };
}
