import { Component, OnInit } from "@angular/core";
import { connectionType, getConnectionType } from "connectivity";
import { Quote } from './shared/sdk/models/index';
import { QuoteApi } from './shared/sdk/services/index';

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    providers: [QuoteApi]
})
export class AppComponent implements OnInit {
    
    quote: Quote = new Quote();
    totalQuotes: any;

    constructor( private quoteApi: QuoteApi ) {}
    
    ngOnInit() {
        this.totalQuotes = this.quoteApi.count().subscribe();
        console.log(this.totalQuotes);
    }


    // public counter: number = 16;

    // public get message(): string {
    //     if (this.counter > 0) {
    //         return this.counter + " taps left";
    //     } else {
    //         return "Hoorraaay! \nYou are ready to start building!";
    //     }
    // }
    
    // public onTap() {
    //     this.counter--;
    // }
}
