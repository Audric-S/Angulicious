import { Injectable } from "@angular/core";
import { Link } from "../models/link.model";
import { LINKS } from "../data/nav.stub";

@Injectable()
export class LinkService {
    private links: Link[] = [];

    constructor(){
        this.links = LINKS;

    }

    getAll(): Link[]{
        return this.links;
    }


}