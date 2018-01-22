import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "capitalize",
    // pure:false
})

export class CapitalizePipe implements PipeTransform {
    public transform(value: any) {
        console.log("caliling transform");
        const strValue = String(value);
        return strValue.charAt(0).toUpperCase() + strValue.slice(1).toLowerCase();
    }
}
