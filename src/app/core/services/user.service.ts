import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {mockUser, User} from "../models/user.model";
import {getGender} from "../../shared/constant/gender.type";
import {MessageResponse, MessageResponseBuilder} from "../models/message-response.model";
import {getRole} from "../../shared/constant/role.type";

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
        const user = mockUser();
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
                .withBody("Created common successfully")
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
                    .withBody(`User ${user.id} not found`)
                    .withStatusCode(404)
                    .withTimestamp(new Date())
                    .build());
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
                .withBody("Updated common successfully")
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
}
