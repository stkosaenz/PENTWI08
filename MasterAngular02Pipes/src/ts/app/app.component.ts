import { Component } from "@angular/core";

@Component({
    selector: "main",
    template: `
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
            <td>First Name</td>
                <tr *ngFor="let person of people | slice:startPerson:endPerson">
                    <td>{{ person.fn }}</td>
                    <td>{{ person.ln }}</td>
                </tr>
            </tbody>
        </table>
        <button #prevButton type="button" (click)="prevPage()">Prev</button>
        <button type="button" (click)="nextPage()">Next</button>
        <!-- <div>{{ prevButton.parentNode.innerHTML | json }}</div>-->
        <br />
        <span>{{ message | capitalize }}</span><br/><br />
        <input type="text" [(ngModel)]="message"><br>
        <input type="text" [(ngModel)]="message2"><br>
        `,
})
export class AppComponent {
    public message: string = "HeLlO!";
    public message2: string = "HeLlO!";
    public people: any[] = [
        { fn: "John", ln: "Smith" },
        { fn: "John", ln: "Thomas" },
        { fn: "John", ln: "James" },
        { fn: "John", ln: "Jones" },
        { fn: "John", ln: "James" },
        { fn: "John", ln: "Johnson" },
        { fn: "John", ln: "Wilkins" },
        { fn: "John", ln: "Frederikson" },
        { fn: "John", ln: "Chandler" },
        { fn: "John", ln: "Cash" },
        { fn: "John", ln: "Rambo" },
        { fn: "John", ln: "Bon Jovi" },
    ];

    public currentPage: number = 0;
    public pageLength: number = 3;

    public get startPerson(): number {
        return this.currentPage * this.pageLength;
    }

    public get endPerson(): number {
        return (this.currentPage + 1) * this.pageLength;
    }

    public prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
        }
    }

    public nextPage() {
        let pages = this.people.length / this.pageLength;
        if (this.people.length % this.pageLength > 0) {
            pages++;
        }

        if ((this.currentPage + 1) < pages) {
            this.currentPage++;
        }
    }
}
