import { Component, Inject } from "@angular/core";
import { Logger } from "./services/logger";
import { ColorsMutable } from "./services/colors-mutable";
import { ColorsToken } from "./tokens/colors-token";
import { Colors } from "./models/colors";

@Component({
    selector: "main",
    template: `
        <ul>
            <li *ngFor="let color of colors">{{ color }}</li>
        </ul>
    `,
})
export class AppComponent {
    public colors: string[] = [];

    public message: string = "Hello World!";
    constructor(
        @Inject(ColorsToken) private colorsSvc: Colors) {
        this.colorsSvc.addColor("red");
        this.colorsSvc.addColor("white");
        this.colorsSvc.addColor("blue");
        this.colors = this.colorsSvc.getAll();
    }

}
