import { Component } from "@angular/core";

interface ContactData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    state: string;
    comments: string;
}

@Component({
    selector: "main",
    template: `
        <!-- <div>Old Message: {{message}}</div>    -->
        <!-- <div>New Message: {{newMessage}}</div> -->

        <form (ngSubmit)="submitForm()">
            <div>
                <label for="first-name-input">First Name:</label>
                <input type="text" id="first-name-input" name="firstNameInput"
                    [(ngModel)]="contact.firstName">
            </div>
            <div>
                <label for="last-name-input">Last Name:</label>
                <input type="text" id="last-name-input" name="lastNameInput"
                    [(ngModel)]="contact.lastName">
            </div>
            <div>
                <label for="state-select">State:</label>
                <select id="state-select" name="stateSelect" [(ngModel)]="contact.state">
                    <option value="">Select One...</option>
                    <option *ngFor="let state of states" [value]="state[0]">{{ state[1] }}</option>
                </select>
            </div>

            <fieldset ngModelGroup="methodsOfContact">
                <legend>Methods of Contact</legend>
                <div>
                    <label for="phone-input">Phone:</label>
                    <input type="text" id="phone-input" name="phoneInput"
                        [(ngModel)]="contact.phone">
                </div>
                <div>
                    <label for="email-input">Email:</label>
                    <input type="text" id="email-input" name="emailInput"
                        [(ngModel)]="contact.email">
                </div>
            </fieldset>
            <div>
                <label for="comments-textarea">Comments:</label>
                <textarea id="comments-textarea" name="comments-textarea" [(ngModel)]="contact.comments"></textarea>
            </div>
            <button type="submit">Send</button>
            <button type="reset">Reset</button>
            <button type="button" (click)="doSomethingElse()">Do Something Else</button>
        </form>
    `,
})
export class AppComponent {
    public contact: ContactData = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        state: "",
        comments: "",
    };

    public states = [
        ["VA", "Virginia"],
        ["CA", "California"],
        ["TX", "Texas"],
        ["FL", "Florida"],
        ["MD", "Maryland"],
    ];

    public submitForm() {
        console.log(this.contact);
    }

    public doSomethingElse() {
        console.log(this.contact);
    }
}
