import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class AuthService {

    public onAuthStatusChange: Subject<boolean> = new Subject<boolean>();

    constructor(
        private readonly _cookieService: CookieService,
    )
    {
        this.isAdminCookie = this.isAdmin();
    }

    public isAdminCookie: boolean = false;


    logout(): void{
        this._cookieService.delete('isAdmin');
        this.onAuthStatusChange.next(false);
        // this.isAdminCookie = this.isAdmin();
    }

    login(): void{
        this._cookieService.set('isAdmin', 'true');
        this.onAuthStatusChange.next(true);
        // this.isAdminCookie = this.isAdmin();
    }

    isAdmin(): boolean{
        return this._cookieService.get('isAdmin') === 'true';
    }
}
