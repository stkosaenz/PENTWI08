import { Component, Directive, Inject, ViewChild } from "@angular/core";
import { NG_ASYNC_VALIDATORS, NgModelGroup, FormGroup } from "@angular/forms";

export interface AddressData {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

import { Geocoding } from "./services/geocoding";
import { STATES, States } from "./services/states";

const validateAddressFactory = (geocoding: Geocoding) => {

    return (g: FormGroup) => {

        return new Promise((resolve, reject) => {

            const controls = g.controls;
            const street = controls.streetInput.value;
            const city = controls.cityInput.value;
            const state = controls.stateSelect.value;
            const zipCode = controls.zipCodeInput.value;

            if (street.length === 0 || city.length === 0 ||
                state.length === 0 || zipCode.length === 0) {
                return Promise.resolve({ geocoding: true });
            }

            const originalAddress = `${street}, ${city}, ${state}, ${zipCode}`;

            geocoding.geocodeAddress(originalAddress).subscribe((results) => {

                const { addressMatches }: { addressMatches: any[] } = results.result;

                if (addressMatches && addressMatches.length === 1) {
                    const { matchedAddress }: { matchedAddress: string } = addressMatches[0];

                    if (matchedAddress === originalAddress.toUpperCase()) {
                        resolve(null);
                    } else {
                        resolve({ geocoding: { mismatch: true } });
                    }
                } else if (addressMatches.length > 1) {
                    resolve({ geocoding: { manyMatches: true } });
                } else {
                    resolve({ geocoding: { noMatch: true } });
                }

            }, () => reject({ geocoding: { unknown: true } }));

        });

    };
};

@Directive({
    selector: "[geocode-address][ngModelGroup]",
    providers: [
        { provide: NG_ASYNC_VALIDATORS, useFactory: validateAddressFactory, multi: true, deps: [Geocoding] },
    ],
})
export class GeocodingValidatorDirective { }

@Component({
    selector: "main",
    styles: [require("./app.component.scss")],
    template: `
       <form>
            <fieldset ngModelGroup="addressGroup" geocode-address>
                <legend>Address <span>(Validated)</span></legend>
                <details class='errors'>
                    <summary>
                        Address Form is Invalid
                        <small>(open for more details)</small>
                    </summary>
                    <ul>
                        <ng-template ngFor let-error [ngForOf]="getGroupErrors(addressGroup)">
                            <li *ngIf="error == 'streetInput:required'">Street is a required field.</li>
                            <li *ngIf="error == 'cityInput:required'">City is a required field.</li>
                            <li *ngIf="error == 'stateSelect:required'">Select is a required field.</li>
                            <li *ngIf="error == 'zipCodeInput:required'">Zip Code is a required field.</li>
                            <li *ngIf="error == 'zipCodeInput:minlength'">Zip Code should be a minimum length of 5.</li>
                        </ng-template>
                        <li *ngIf="addressGroup.errors?.geocoding?.mismatch">Address contains an error.</li>
                        <li *ngIf="addressGroup.errors?.geocoding?.noMatch">Address does not exist.</li>
                        <li *ngIf="addressGroup.errors?.geocoding?.manyMatches">Multiple addresses matched.</li>
                        <li *ngIf="addressGroup.errors?.geocoding?.unknown">Address validation failed.</li>
                    </ul>
                </details>
                <section>
                    <div>
                        <label id="street-input">Street:</label>
                        <input type="text" id="street-input" required autocomplete="off"
                            name="streetInput" [(ngModel)]="address.street">
                    </div>
                    <div>
                        <label id="city-input">City:</label>
                        <input type="text" id="city-input" required autocomplete="off"
                            name="cityInput" [(ngModel)]="address.city">
                    </div>
                    <div>
                        <label id="state-select">State:</label>
                        <select id="state-select" name="stateSelect" [(ngModel)]="address.state" required>
                            <option value="">Select One...</option>
                            <option *ngFor="let state of states" [value]="state.abbreviation">{{state.name}}</option>
                        </select>
                    </div>
                    <div>
                        <label id="zip-code-input">Zip Code:</label>
                        <input type="text" id="zip-code-input" required minlength="5" autocomplete="off"
                            name="zipCodeInput" [(ngModel)]="address.zipCode">
                    </div>
                </section>
            </fieldset>
       </form>
    `,
})
export class AppComponent {

    @ViewChild(NgModelGroup)
    public addressGroup: NgModelGroup;

    public address: AddressData = {
        street: "",
        city: "",
        state: "",
        zipCode: "",
    };

    constructor(
        @Inject(STATES) private states: States,
    ) { }

    public getGroupErrors(fg: NgModelGroup | FormGroup) {

        if (!fg) { return []; }

        if (fg instanceof NgModelGroup && !fg.control) {
            return [];
        }

        const controls = fg instanceof NgModelGroup ? fg.control.controls : fg.controls;

        return [].concat(Object.keys(controls)
            .filter((controlKey) => controls[controlKey].errors)
            .map((controlKey) => [controlKey, Object.keys(controls[controlKey].errors)])
            .map(([controlKey, errorKeys]: [string, string[]]) =>
                errorKeys.map((errorKey) => controlKey + ":" + errorKey)));
    }


}
