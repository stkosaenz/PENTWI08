import { Injectable } from "@angular/core";

import { Http } from "@angular/http";

import "rxjs";

@Injectable()
export class Geocoding {

    private baseURL = "/geocoder/locations/onelineaddress";
    private benchmarkParam = "Public_AR_Current";
    private formatParam = "json";

    constructor(private http: Http) { }

    public geocodeAddress(address: string) {

        let url = `${this.baseURL}?address=${encodeURIComponent(address)}`;
        url += `&benchmark=${this.benchmarkParam}&format=${this.formatParam}`;

        return this.http.get(url).map((res) => res.json());

    }
}
