import { IonIcon } from "@ionic/react";
import { chevronForwardCircleOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { map, size } from "lodash";
import { ListChannelsTypes } from "./ListChannels.types";
import "./ListChannels.scss";

export function ListChannels(props: ListChannelsTypes.Props) {
  const { channels } = props;

  return (
    <div className="list-channels">
      {size(channels) === 0 ? (
        <p className="list-channels__no-channels">
          ¡No hay canales, crea el primero!
        </p>
      ) : (
        map(channels, (channel) => (
          <Link
            to={`/channel/${channel.id}`}
            key={channel.id}
            className="list-channels__block"
          >
            <span>{channel.name}</span>
            <IonIcon icon={chevronForwardCircleOutline} />
          </Link>
        ))
      )}
    </div>
  );
}
