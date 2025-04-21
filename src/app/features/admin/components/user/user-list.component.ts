import {Component, OnInit} from "@angular/core";

import {UserService} from "../../../../shared/services/user.service";
import {User} from "../../../../core/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {RoleType} from "../../../../shared/constant/role.type";
import {Router} from "@angular/router";
import {MessageResponse} from "../../../../core/models/message-response.model";
import {getMessageResponse} from "../../../../shared/utils/router-helper";
import {MessageType} from "../../../../shared/constant/message.type";
import {isError} from "../../../../shared/constant/message-mapping";
import {isSuccess} from "angular-in-memory-web-api";

@Component({
    selector: "admin-users",
    templateUrl: "./user-list.component.html"
})
export class AdminUserListComponent implements OnInit {
    users: User[];
    isAdmin: boolean = false;
    currentUser: User = null;
    messageResponse: MessageResponse = null;
    messageType: MessageType;

    constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router) {
        this.messageResponse = getMessageResponse(this.router);
        if (this.messageResponse) {
            this.messageType = this.setMessageType();
        }
    }

    setMessageType() {
        if (isError(this.messageResponse.statusCode)) {
            return MessageType.ERROR;
        } else if (isSuccess(this.messageResponse.statusCode)) {
            return MessageType.SUCCESS;
        }
        return null;
    }

    ngOnInit(): void {
        this.users = this.userService.getUsers()
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser && this.currentUser?.role === RoleType[RoleType.ADMIN]) {
            this.isAdmin = true;
        }
    }

    deleteUser(user: User) {
        if (window.confirm("Are you sure you want to delete this user?")) {
            this.userService.remove(user);
            this.users = this.userService.getUsers();
        }
    }
}