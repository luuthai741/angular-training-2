import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from "../model/user.model";
import {GenderType} from "../constant/gender-type";
import {MessageResponse, MessageResponseBuilder} from "../model/message-response.model";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    _users: User[] = [];

    constructor() {
        this._users = !window.localStorage.getItem('users')
            ? []
            : JSON.parse(window.localStorage.getItem('users'))
    }

    private createUserId(): number {
        return this._users.length > 0
            ? parseInt(String(this._users[this._users.length - 1].id)) + 1
            : 1;
    }


    getUsers(): User[] {
        this._users = JSON.parse(window.localStorage.getItem('users'));
        return this._users;
    }

    getUserByUsername(username: string): User {
        if (this._users.length === 0) {
            return null;
        }
        return this._users.find(user => username === user.username);
    }

    getUserById(id: number): User {
        if (this._users.length === 0) {
            return null;
        }
        return this._users.find(user => parseInt(String(user.id)) === id);
    }

    saveUser(user: User): Observable<MessageResponse> {
        return new Observable<MessageResponse>(observable => {
            this._users = [
                ...this._users,
                {
                    ...user,
                    id: this.createUserId(),
                    gender: this.getGender(parseInt(user.gender))
                }
            ];
            window.localStorage.setItem('users', JSON.stringify(this._users));
            observable.next(new MessageResponseBuilder()
                .withBody("Created user successfully")
                .withStatusCode(201)
                .withTimestamp(new Date())
                .build()
            )
            observable.complete();
        })
    }

    updateUser(user: User): Observable<MessageResponse> {

        return new Observable<MessageResponse>(observable => {
            const index = this._users.findIndex((u) => u.id === user.id);
            if (index === -1) {
                observable.error(new MessageResponseBuilder()
                    .withBody(`User ${user.id} not found`)
                    .withStatusCode(404)
                    .withTimestamp(new Date())
                    .build());
            }
            this._users = [
                ...this._users.slice(0, index),
                {
                    ...user,
                    gender: this.getGender(parseInt(user.gender))
                },
                ...this._users.slice(index + 1),
            ];
            window.localStorage.setItem('users', JSON.stringify(this._users));
            observable.next(new MessageResponseBuilder()
                .withBody("Updated user successfully")
                .withStatusCode(200)
                .withTimestamp(new Date())
                .build()
            )
            observable.complete();
        })
    }

    public getGender(value: number): string | undefined {
        return GenderType[value];
    }

    remove(user: User): void {
        this._users = this._users.filter((u) => {
            return u.id !== user.id;
        });
        if (this._users.length > 0) {
            window.localStorage.setItem('users', JSON.stringify(this._users));
            return;
        }
        window.localStorage.removeItem('users');
    }
}
