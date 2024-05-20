import { getDatabase, ref, onValue } from "firebase/database";
import { ChannelModel } from "../models";

export class ChannelRealtime {
  getAll(setChannels: (channels: [ChannelModel] | []) => void) {
    try {
      const db = getDatabase();
      const channelsRef = ref(db, "channels");

      onValue(channelsRef, (snapshot) => {
        const data = snapshot.val();

        if (!data) setChannels([]);
        else setChannels(data);
      });
    } catch (error) {
      throw error;
    }
  }
}
