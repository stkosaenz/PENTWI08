import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import "rxjs";

@Injectable()
export class Books {
    constructor(private http: Http) { }
    public getBook(bookId: number) {
        return this.http.get(`http://localhost:5000/books/${encodeURIComponent(bookId.toString())}`)
            .map((res) => res.json());
    }
}
