import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Logger, simpleLogger } from "./services/logger";
import { ColorsMutable } from "./services/colors-mutable";
import { ColorsImmutable } from "./services/colors-immutable";
import { AppComponent } from "./app.component";
import { ColorsToken } from "./tokens/colors-token";

import "../../scss/styles.scss";

// const useImmutable = false;
// const colorsFactory = (logger: Logger) => {
//     if (useImmutable) {
//         return new ColorsImmutable(logger);
//     } else {
//         return new ColorsMutable(logger);
//     }
// };

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        { provide: Logger, useValue: simpleLogger },
        // { provide: ColorsMutable, useFactory: colorsFactory, deps: [Logger] },
        { provide: ColorsToken, useClass: ColorsImmutable },
    ],
})
export class AppModule { }
