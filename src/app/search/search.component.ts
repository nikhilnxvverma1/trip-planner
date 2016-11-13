/**
 * Created by NikhilVerma on 12/11/16.
 */
import { Component,Inject,NgZone } from '@angular/core';
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
    constructor(@Inject private dataService:DataService,private _zone:NgZone) { }

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
           type:'get',
            _zone:this._zone,
            list:this.searchItemList,
           error:function(error){

           },
           success:function(data){
               this._zone.run(()=>{
                   this.findPlaces(data.lat, data.lng)
               };

           },
            findPlaces:function(lat,long){
                $.ajax({
                    url:'findplaces/?lat='+lat+'&long='+long,
                    list:this.list,
                    _zone:this._zone,
                    type:'get',
                    error:function(error){

                    },
                    success:function(data){
                        console.log(data);
                        this._zone.run(()=>{
                            this.list.splice(0,this.list.length)
                            var array = data.data;
                            for(var i=0; i<array.length; i++){
                                var searchItem=new SearchItem();
                                searchItem.name=array[i].name;
                                searchItem.description=array[i].category.localized_name;
                                searchItem.rating=array[i].rating;

                                this.list.push(searchItem);
                            }
                        };
                    },
                });
            }
        });
    }

    findPlaces(lat,long){
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

    changeInFormat(data):void {
        console.log(data);
    }
}

