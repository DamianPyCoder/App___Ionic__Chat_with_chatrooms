import { getDatabase, child, set, ref, get } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { ChannelModel } from "../models";

export class Channel {
  create(name: string) {
    try {
      const db = getDatabase();
      const channelId = uuidv4();

      const channelRef = ref(db, `channels/${channelId}`);

      set(channelRef, {
        id: channelId,
        name,
      });
    } catch (error) {
      throw error;
    }
  }

  get(id: string, setChannel: (channel: ChannelModel) => void) {
    const db = getDatabase();
    const channelRef = ref(db);
    const channelChild = child(channelRef, `channels/${id}`);

    get(channelChild).then((snapshot) => {
      setChannel(snapshot.val());
    });
  }
}
