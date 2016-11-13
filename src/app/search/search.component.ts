/**
 * Created by NikhilVerma on 12/11/16.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
})
export class SearchComponent {
    constructor() { }

    search(term:string){
        console.log(" term is "+term);
    }

    parametersChange(parameter:Parameter){
        console.log('recieved change for paraemetr ' +parameter);
    }
}
