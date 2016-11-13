import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import {Parameter} from "../search/parameter";
import {SearchItem} from "./search-item";

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getSearchResultFor(term:string,parameter:Parameter):SearchItem[]{

    var result=[];

    for(var i=0;i<20;i++){
      result.push(new SearchItem());
    }

    return result;
  }
}
