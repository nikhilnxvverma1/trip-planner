/**
 * Created by NikhilVerma on 12/11/16.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'compare',
    templateUrl: './compare.component.html',
})
export class CompareComponent {
    private _selectedIndex:number=0;
    constructor() { }

    selectInfographic(index:number){
        this._selectedIndex=index;
    }

}
