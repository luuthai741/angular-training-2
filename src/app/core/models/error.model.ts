import {MessageType} from "../../shared/constant/message.type";

export interface Error{
    title: string;
    body: string[];
    messageType: MessageType
}