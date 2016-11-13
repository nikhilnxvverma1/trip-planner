/**
 * Created by NikhilVerma on 12/11/16.
 */
import { Component,Inject } from '@angular/core';
import { Parameter } from './parameter';
import {DataService} from "../services/data.service";
import {SearchItem} from "../services/search-item";

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
})
export class SearchComponent {
    parameter:Parameter;
    searchItemList:SearchItem[]=[];
    constructor(@Inject private dataService:DataService) { }

    search(term:string){
        console.log(" term is "+term);
    }

    parametersChange(parameter:Parameter){
        console.log('recieved change for paraemetr ' +parameter);
        this.parameter=parameter;

    }
}
