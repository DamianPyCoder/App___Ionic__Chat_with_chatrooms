import { IonHeader, IonTitle, IonIcon } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { BasicHeaderTypes } from "./BasicHeader.types";
import "./BasicHeader.scss";

export function BasicHeader(props: BasicHeaderTypes.Props) {
  const { title, back } = props;
  const { goBack } = useHistory();

  return (
    <IonHeader className="header ion-padding">
      {back && <IonIcon icon={chevronBack} onClick={goBack} />}
      <IonTitle>{title}</IonTitle>
    </IonHeader>
  );
}
