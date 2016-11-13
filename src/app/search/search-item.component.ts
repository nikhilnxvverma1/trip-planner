/**
 * Created by NikhilVerma on 12/11/16.
 */
import { Component,Input,OnInit } from '@angular/core';
import {SearchItem} from "../services/search-item";

@Component({
    selector: 'search-item',
    templateUrl: './search-item.component.html',
})
export class SearchItemComponent implements OnInit{
    @Input('searchItem') searchItem:SearchItem;
    ratingLoop:number[];
    halfStar:boolean;
    constructor() {

    }

    ngOnInit():any{
        this.ratingLoop=Array.from(Array(Math.ceil(this.searchItem.rating)).keys())
        this.halfStar=Math.ceil(this.searchItem.rating)-this.searchItem.rating>0;
    }
}

