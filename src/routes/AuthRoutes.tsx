import { Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Channels, CreateChannel, Channel } from "../pages";

export function AuthRoutes() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <Channels />
        </Route>
        <Route exact path="/create-channel">
          <CreateChannel />
        </Route>
        <Route exact path="/channel/:id">
          <Channel />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
}
