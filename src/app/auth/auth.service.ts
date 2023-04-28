import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;
    private url = 'https://identitytoolkit.googleapis.com/v1/accounts:{SERVICE}';

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.getSignUpUrl(), {
            email: email,
            password: password,
            returnSecureToken: true
        }, {
            params: new HttpParams().set('key', environment.firebaseApiKey)
        }).pipe(
            catchError(this.handleError),
            tap(this.handleAuthentication.bind(this))
        );
    }

    signIn(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.getSignInUrl(), {
            email: email,
            password: password,
            returnSecureToken: true
        }, {
            params: new HttpParams().set('key', environment.firebaseApiKey)
        }).pipe(
            catchError(this.handleError),
            tap(this.handleAuthentication.bind(this))
        );
    }

    signOut() {
        if (this.tokenExpirationTimer) {
            clearInterval(this.tokenExpirationTimer);
        }

        this.user.next(null);
        this.tokenExpirationTimer = null;
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }

    autoSignIn() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (!loadedUser.token) {
            return;
        }

        this.user.next(loadedUser);

        const expirationMs = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoSignOut(expirationMs);
    }

    autoSignOut(expirationMs: number) {
        this.tokenExpirationTimer = setInterval(() => {
            this.signOut()
        }, expirationMs);
    }

    private handleAuthentication(response: AuthResponseData) {
        const expireTime = new Date().getTime() + +response.expiresIn * 1000;
        const expireDate = new Date(expireTime);
        const user = new User(response.email, response.localId, response.idToken, expireDate);
        localStorage.setItem('userData', JSON.stringify(user));
        this.user.next(user);
        this.autoSignOut(+response.expiresIn * 1000);
    }

    private handleError(response: HttpErrorResponse) {
        let code = '';
        let message = '';
        if (response.error && response.error.error) {
            code = response.error.error.message;
        }

        switch (code) {
            case 'EMAIL_EXISTS':
                message = 'This email already exists';
                break;

            case 'EMAIL_NOT_FOUND':
                message = 'This email does not exists';
                break;

            case 'INVALID_PASSWORD':
                message = 'This password is not correct';
                break;
            
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                message = 'Too many attempts. Try again later';
                break;

            default:
                message = 'An error occurred';
                break;
        }

        return throwError(() => new Error(message));
    }

    private getSignUpUrl() {
        return this.getUrl('signUp');
    }

    private getSignInUrl() {
        return this.getUrl('signInWithPassword');
    }

    private getUrl(service: string) {
        return this.url.replace('{SERVICE}', service);
    }
}
