import {Router} from "@angular/router";
import {MessageResponse} from "../../core/models/message-response.model";
import {isError, isSuccess} from "../constant/message-mapping";
import {MessageType} from "../constant/message.type";

export function getMessageResponse(router: Router): MessageResponse {
    const navigation = router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    console.log(state)
    if (state) {
        const messageResponse = state as MessageResponse;
        setMessageType(messageResponse);
        return messageResponse;
    }
    return null;
}

export function setMessageType(messageResponse: MessageResponse): void {
    if (!messageResponse) {
        return;
    }
    if (isError(messageResponse.statusCode)) {
        messageResponse.messageType = MessageType.ERROR;
    } else if (isSuccess(messageResponse.statusCode)) {
        messageResponse.messageType = MessageType.SUCCESS;
    }
    return;
}