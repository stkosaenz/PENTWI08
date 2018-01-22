import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CapitalizePipe } from "./pipes/capitalize.pipe";

import "../../scss/styles.scss";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [AppComponent, CapitalizePipe],
    bootstrap: [AppComponent],
})
export class AppModule { }
