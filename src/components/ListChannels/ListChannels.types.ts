import { ChannelModel } from "../../models";

export namespace ListChannelsTypes {
  export type Props = {
    channels: [ChannelModel] | [];
  };
}
