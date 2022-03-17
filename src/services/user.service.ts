import { BehaviorSubject } from 'rxjs';
import Router from 'next/router';
import { fetchWrapper } from 'src/helpers';

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    registration,
    login,
    logout
};

function registration(name, password) {
    return fetchWrapper.post(`${process.env.API_URL}/users/registration`, { name, password })
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function login(name, password) {
    return fetchWrapper.post(`${process.env.API_URL}/users/login`, { name, password })
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/');
}
