import { Component, ViewChild, AfterViewInit, ViewChildren, QueryList } from "@angular/core";
import { NgForm, NgModelGroup, NgModel, FormGroup } from "@angular/forms";

@Component({
    selector: "main",
    template: `
        <form id="contact-form" novalidate>
            <fieldset #addressGroup="ngModelGroup" ngModelGroup="address">
                <legend>Address</legend>
                <details *ngIf="addressGroup.invalid">
                    <summary>
                        Address is Invalid
                        <small>(open for more details)</small>
                    </summary>
                    <ul>
                        <ng-template ngFor let-error [ngForOf]="getGroupErrors(addressGroup)">
                            <li *ngIf="error == 'streetInput:required'">Street is a required field.</li>
                            <li *ngIf="error == 'cityInput:required'">City is a required field.</li>
                        </ng-template>
                    </ul>
                </details>
                <section>
                    <div>
                        <strong *ngIf="streetInput.invalid && streetInput.touched">*</strong>
                        <label for="street-input">Street:</label>
                        <input id="street-input" type="text" #streetInput="ngModel"
                            [(ngModel)]="street" name="streetInput" required>
                        <!-- <span *ngIf="streetInput.invalid && streetInput.touched">
                            Street is required
                        </span> -->
                    </div>
                    <div>
                        <strong *ngIf="cityInput.invalid && cityInput.touched">*</strong>
                        <label for="city-input">City:</label>
                        <input id="city-input" type="text" #cityInput="ngModel"
                            [(ngModel)]="city" name="cityInput" required>
                        <!-- <span *ngIf="cityInput.invalid && cityInput.touched">
                            City is required
                        </span> -->
                    </div>
                </section>
            </fieldset>
            <!-- <button type="submit" [disabled]="contactForm.invalid">Submit</button> -->
            <button type="submit" *ngIf="!contactForm.invalid">Submit</button>
        </form>
    `,
})
export class AppComponent implements AfterViewInit {

    public street: string = "";

    @ViewChild(NgForm)
    public contactForm: NgForm;

    @ViewChildren(NgForm)
    public contactControls: QueryList<NgModel>;

    public ngAfterViewInit() {
        console.log(this.contactForm);
        console.log(this.contactControls);
    }

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
