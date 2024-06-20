import { Injectable } from "@angular/core";
import { Link } from "../models/link.model";
import { LINKS } from "../data/nav.stub";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class LinkService {
    private links: Link[] = [];

    constructor(private cookieService: CookieService) {
        this.links = this.getAdjustedLinks();
    }

    private getAdjustedLinks(): Link[] {
        const isAdmin = this.cookieService.check('isAdmin');
        return isAdmin ? 
            LINKS.filter(link => link.label !== "Login") : 
            LINKS.filter(link => link.label !== "Logout");
    }

    getAll(): Link[] {
        return this.links;
    }
}
