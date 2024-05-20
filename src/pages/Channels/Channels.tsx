import { useState, useEffect } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { ChannelRealtime } from "../../api";
import { ChannelModel } from "../../models";
import { useAuth } from "../../hooks";
import { ListChannels } from "../../components";
import "./Channels.scss";

const channelRtController = new ChannelRealtime();

export function Channels() {
  const { username } = useAuth();
  const [channels, setChannels] = useState<[ChannelModel] | [] | null>(null);

  useEffect(() => {
    channelRtController.getAll(setChannels);
  }, []);

  return (
    <IonContent className="channels-page ion-padding">
      <h2>Bienvenido, {username}!</h2>

      <h5>¿En que canal quieres entrar?</h5>

      {channels ? (
        <ListChannels channels={channels} />
      ) : (
        <div className="channels-page__loading">
          <IonSpinner />
          <span>Obteniendo canales</span>
        </div>
      )}

      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <Link to="/create-channel">
          <IonFabButton>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </Link>
      </IonFab>
    </IonContent>
  );
}
