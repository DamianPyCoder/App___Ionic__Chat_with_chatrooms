import { useState, useEffect, createRef } from "react";
import { IonContent, IonSpinner } from "@ionic/react";
import { useParams } from "react-router-dom";
import { Channel as ChannelController, MessageRealtime } from "../../api";
import { ChannelModel, MessageModel } from "../../models";
import { BasicHeader, InputChat, ListMessages } from "../../components";
import { ChannelTypes } from "./Channel.type";
import "./Channel.scss";

const channelController = new ChannelController();
const messageRtController = new MessageRealtime();

export function Channel() {
  const { id } = useParams<ChannelTypes.Params>();
  const [channel, setChannel] = useState<ChannelModel | null>(null);
  const [messages, setMessages] = useState<[MessageModel] | [] | null>(null);
  const contentRef = createRef<HTMLIonContentElement>();

  useEffect(() => {
    channelController.get(id, setChannel);
    messageRtController.getAll(id, setMessages);
  }, [id]);

  useEffect(() => {
    contentRef.current?.scrollToBottom(contentRef.current.scrollHeight);
  }, [messages, contentRef]);

  return (
    <>
      <BasicHeader title={channel?.name} back />

      <IonContent className="channel-page ion-padding" ref={contentRef}>
        {messages ? (
          <ListMessages messages={messages} />
        ) : (
          <div className="channel-page__loading">
            <IonSpinner />
            <span>Obteniendo mensajes</span>
          </div>
        )}

        <InputChat channelId={id} />
      </IonContent>
    </>
  );
}
