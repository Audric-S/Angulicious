import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class AuthService {
    private _isAdminSubject: BehaviorSubject<boolean>;

    constructor(
        private readonly _cookieService: CookieService,
    ) {
        this._isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin());
    }

    public get onAuthStatusChange(): Observable<boolean> {
        return this._isAdminSubject.asObservable();
    }

    logout(): void {
        this._cookieService.delete('isAdmin');
        this._isAdminSubject.next(false);
    }

    login(): void {
        this._cookieService.set('isAdmin', 'true');
        this._isAdminSubject.next(true);
    }

    isAdmin(): boolean {
        return this._cookieService.get('isAdmin') === 'true';
    }
}
