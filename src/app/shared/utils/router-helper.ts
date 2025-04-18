import {Router} from "@angular/router";
import {MessageResponse} from "../../core/models/message-response.model";

export function getMessageResponse(router: Router): MessageResponse {
    const navigation = router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state) {
        return state as MessageResponse;
    }
    return null;
}