/**
 * Created by NikhilVerma on 12/11/16.
 */
import { Component,Inject } from '@angular/core';
import { Parameter } from './parameter';
import {DataService} from "../services/data.service";
import {SearchItem} from "../services/search-item";
declare var $:any;
@Component({
    selector: 'search',
    templateUrl: './search.component.html',
})
export class SearchComponent {
    term:string;
    parameter:Parameter;
    searchItemList:SearchItem[]=[];
    constructor(@Inject private dataService:DataService) { }

    search(term:string){
        console.log(" term is "+term);
        this.term=term;
        //this.searchItemList=this.dataService.getSearchResultFor(this.term,this.parameter);
        this.searchWithAjax();
    }

    parametersChange(parameter:Parameter){
        console.log('recieved change for paraemetr ' +parameter);
        this.parameter=parameter;
        //this.searchItemList=this.dataService.getSearchResultFor(this.term,this.parameter);
        this.searchWithAjax();
    }

    searchWithAjax(){
        $.ajax({
           url:'/getLatLong?location='+this.term,
           type:'post',
           error:function(error){

           },
           success:function(data){
               this.findPlaces(data.lat, data.long)
           },
        });
    }

    findPlaces(lat:number,long:number){
        $.ajax({
            url:'findplaces/?lat='+lat+'&long='+long,
            type:'get',
            error:function(error){

            },
            success:function(data){
                this.changeInFormat(data);
            },
        });
    }

    private changeInFormat(data:any):void {
        console.log(data);
    }
}

