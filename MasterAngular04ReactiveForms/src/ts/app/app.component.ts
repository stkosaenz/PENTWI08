import { Component } from "@angular/core";
import { FormControl, FormGroup, FormArray, FormBuilder } from "@angular/forms";

@Component({
  selector: "main",
  template: `
    <form [formGroup]="profileForm">
      <h1>Profile Form</h1>
      <div>
        <label for="first-name-input">First Name</label>
        <input type="text" id="first-name-input" formControlName="firstNameInput">
        <!-- <br>Value: {{ profileForm.controls["firstNameInput"].value}} -->
      </div>
      <div>
        <label for="last-name-input">Last Name</label>
        <input type="text" id="last-name-input" formControlName="lastNameInput">
        <!-- <br>Value: {{ profileForm.controls["lastNameInput"].value}} -->
      </div>
      <div formArrayName="addressGroups">
        <div *ngFor="let addressGroup of profileForm.controls['addressGroups'].controls" [formGroup]="addressGroup">
          <h2>Address</h2>
          <div>
            <label for="street-input">Street</label>
            <input type="text" id="street-input" formControlName="streetInput">
            <!-- <br>Value: {{ addressGroup.controls["streetInput"].value}} -->
          </div>
          <div>
            <label for="city-input">City</label>
            <input type="text" id="city-input" formControlName="cityInput">
            <!-- <br>Value: {{ addressGroup.controls["cityInput"].value}} -->
          </div>
          <div>
            <label for="state-input">State</label>
            <input type="text" id="state-input" formControlName="stateInput">
            <!-- <br>Value: {{ addressGroup.controls["stateInput"].value}} -->
          </div>
          <div>
            <label for="zipcode-input">Zip Code</label>
            <input type="text" id="zipcode-input" formControlName="zipCodeInput">
            <!-- <br>Value: {{ addressGroup.controls["zipCodeInput"].value}} -->
          </div>
        </div>
      </div>
      <button type="button" (click)="addAddressGroup()">Add Address Group</button>
      <div>
        <button type="button" (click)="saveProfileForm()">Save Profile</button>
      </div>
    </form>
    `,
})
export class AppComponent {
  public profileForm: FormGroup;
  //  = new FormGroup({
  //   firstNameInput: new FormControl(""),
  //   lastNameInput: new FormControl(""),
  //   addressGroups: new FormArray([this.newAddressGroup()]),
  // });

  public message: string = "Hello World!";

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstNameInput: [""],
      lastNameInput: [""],
      addressGroups: this.fb.array([this.fb.group({
        streetInput: [""],
        cityInput: [""],
        stateInput: [""],
        zipCodeInput: [""],
      })]),
    });
  }

  public newAddressGroup() {
    return new FormGroup({
      streetInput: new FormControl(""),
      cityInput: new FormControl(""),
      stateInput: new FormControl(""),
      zipCodeInput: new FormControl(""),
    });
  }

  public addAddressGroup() {
    const fa = this.profileForm.controls["addressGroups"] as FormArray;
    fa.push(this.newAddressGroup());
  }

  public saveProfileForm() {
    console.log(this.profileForm.value);
  }
}
