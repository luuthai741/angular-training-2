import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {User} from "../../core/models/user.model";
import {GenderType, getGender} from "../constant/gender.type";
import {MessageResponse, MessageResponseBuilder} from "../../core/models/message-response.model";
import {getRole, RoleType} from "../constant/role.type";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private users: User[] = [];

    constructor() {
        this.users = !window.localStorage.getItem('users')
            ? []
            : JSON.parse(window.localStorage.getItem('users'))
    }

    private createUserId(): number {
        return this.users.length > 0
            ? parseInt(String(this.users[this.users.length - 1].id)) + 1
            : 1;
    }

    createDefaultUser(): void {
        const user = this.mockUser();
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    getUsers(): User[] {
        if (this.users.length === 0) {
            this.createDefaultUser();
        }
        this.users = JSON.parse(window.localStorage.getItem('users'));
        return this.users;
    }

    getUserByUsername(username: string): User {
        if (this.users.length === 0) {
            return null;
        }
        return this.users.find(user => username === user.username);
    }

    getUserById(id: number): User {
        if (this.users.length === 0) {
            return null;
        }
        return this.users.find(user => parseInt(String(user.id)) === id);
    }

    saveUser(user: User): Observable<MessageResponse> {
        return new Observable<MessageResponse>(observable => {
            if (this.isUsernameExists(user.username)) {
                observable.error(new MessageResponseBuilder()
                    .withBody("usernameExisting")
                    .withStatusCode(400)
                    .withTimestamp(new Date())
                    .build());
                return;
            }
            this.users = [
                ...this.users,
                {
                    ...user,
                    id: this.createUserId(),
                    gender: getGender(user.gender),
                    role: getRole(user.role)
                }
            ];
            window.localStorage.setItem('users', JSON.stringify(this.users));
            observable.next(new MessageResponseBuilder()
                .withBody("userCreatedSuccess")
                .withStatusCode(201)
                .withTimestamp(new Date())
                .build()
            )
            observable.complete();
        })
    }

    updateUser(user: User): Observable<MessageResponse> {
        return new Observable<MessageResponse>(observable => {
            const index = this.users.findIndex((u) => u.id === user.id);
            if (index === -1) {
                observable.error(new MessageResponseBuilder()
                    .withBody(`userIsNotFound`)
                    .withStatusCode(404)
                    .withTimestamp(new Date())
                    .build());
                return;
            }
            this.users = [
                ...this.users.slice(0, index),
                {
                    ...user,
                    gender: getGender(user.gender),
                    role: getRole(user.role)
                },
                ...this.users.slice(index + 1),
            ];
            window.localStorage.setItem('users', JSON.stringify(this.users));
            observable.next(new MessageResponseBuilder()
                .withBody(`userUpdatedSuccess`)
                .withStatusCode(200)
                .withTimestamp(new Date())
                .build()
            )
            observable.complete();
        })
    }

    remove(user: User): void {
        this.users = this.users.filter((u) => {
            return u.id !== user.id;
        });
        if (this.users.length > 0) {
            window.localStorage.setItem('users', JSON.stringify(this.users));
            return;
        }
        window.localStorage.removeItem('users');
    }

    isUsernameExists(username: string): boolean {
        const usernames = JSON.parse(window.localStorage.getItem('users')).map((user: { username: string; }) => {
            return user.username;
        });
        return usernames.includes(username);
    }

    private mockUser():User {
        return {
            id: 1,
            username: 'admin',
            password: 'P@zzw0rd123',
            fullName: 'Admin',
            age: 18,
            gender: GenderType[GenderType.MALE],
            role: RoleType[RoleType.ADMIN],
        };
    }
}
