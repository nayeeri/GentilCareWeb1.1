import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    private postIniciarSesion = `${environment.baseApi}/api/auth/login`;
    private getValidarToken = `${environment.baseApi}/api/auth/verificaToken/`;

    /**
     * Constructori
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: any): Observable<any>
    {
        if (credentials.rememberMe) {
            localStorage.setItem('email', JSON.stringify(credentials['email']));
        }

        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('El usuario ya ha iniciado sesión.');
        }

        return this._httpClient.post(this.postIniciarSesion,
            { acceso: credentials.email, password: credentials.password}
            ).pipe(
            switchMap((response: any) => {
                console.log('signIn', response);
                if (response.status) {
                    localStorage.setItem('Im', response.usersId);
                    // Store the access token in the local storage
                    this.accessToken = response.token;

                    // Set the authenticated flag to true
                    this._authenticated = true;
                 return   this.signInUsingToken();
                }
                // Return a new observable with the response
               // return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        if (!this.accessToken) {
            this.router.navigateByUrl('/sign-in');
        }

        const headers = new HttpHeaders({
            'Token-G3nt1l': this.accessToken
        });
        let im = localStorage.getItem('Im');
        // Renew token
        return this._httpClient.get(this.getValidarToken + im, { headers }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {
                if (response) {

                    // Store the user on the user service
                    this._userService.user = response;

                    localStorage.setItem('usuario', JSON.stringify(response));

                    // Return true
                    return of(true);
                }
                else{
                    this.router.navigateByUrl('/sign-in');
                }
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
