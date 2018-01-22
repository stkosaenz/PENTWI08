import { Component } from "@angular/core";

@Component({
    selector: "main",
    styles: [
        "input.ng-invalid.ng-touched { border: 2px solid red; margin:5px; }",
        "input + span { display: none; }",
        "input.ng-invalid + span { display: inline; }",
    ],
    template: `
        <form>
            <fieldset ngModelGroup="someGroup">
                <!-- <div>
                    <label for="make-required">Make Required:</label>
                    <input type="checkbox" id="make-required" required
                        [(ngModel)]="makeRequired" name="makeRequiredInput">
                    <span>Make required is required.</span>
                </div> -->
                <div>
                    <!--
                    <label for="phone-number-input">Phone Number:</label>
                    <input type="text" id="phone-number-input" name="phoneNumberInput"
                        pattern="^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$"
                        [(ngModel)]="phoneNumber">
                    <span>Phone number is invalid.</span>
                    -->
                    <label for="email-address-input">Email Adress:</label>
                    <input type="email" id="email-address-input" name="emailAddressInput"
                        email required
                        [(ngModel)]="emailAddress">
                    <span>Email Address is invalid.</span>
                </div>
            </fieldset>
        </form>
    `,
})
export class AppComponent {
    public emailAddress: string = "";

}
