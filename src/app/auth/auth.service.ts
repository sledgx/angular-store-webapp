import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";

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
    private url = 'https://identitytoolkit.googleapis.com/v1/accounts:{SERVICE}?key={KEY}';

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.getSignUpUrl(), {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError)
        );
    }

    signIn(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.getSignInUrl(), {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError)
        );
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
        return this.url
            .replace('{SERVICE}', service)
            .replace('{KEY}', environment.firebaseApiKey);
    }
}
