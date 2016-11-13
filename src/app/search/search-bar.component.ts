/**
 * Created by NikhilVerma on 12/11/16.
 */
import { Component,Output,EventEmitter } from '@angular/core';
import { Parameter } from './parameter';

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {

    searchTerm:string;

    @Output('search') searchEvent=new EventEmitter<string>();

    constructor() { }

    searchEntered(event){
        console.log('search term is '+this.searchTerm);
        this.searchEvent.emit(this.searchTerm);
    }
}

