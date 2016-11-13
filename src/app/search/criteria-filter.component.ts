/**
 * Created by NikhilVerma on 12/11/16.
 */
import { Component,OnInit,Output,EventEmitter } from '@angular/core';
import { Parameter } from './parameter';
declare var noUiSlider:any;
declare var $:any;
@Component({
    selector: 'criteria-filter',
    templateUrl: './criteria-filter.component.html',
})
export class CriteriaFilterComponent implements OnInit{

    parameter:Parameter;

    travelTime=3;
    transportation=1;
    minBudget=2000;
    maxBudget=6000;

    @Output('parametersChange') parametersChangeEvent=new EventEmitter<Parameter>();

    constructor() {}

    ngOnInit():any {
        this.initSliderView();
        return undefined;
    }

    travelTimeChanged(){
        console.log("Travel time  is "+this.travelTime);
        this.parametersChangeEvent.emit(new Parameter(this.travelTime,this.transportation,this.minBudget,this.maxBudget));
    }

    transportationChanged(){
        console.log("transporttion  is "+this.transportation);
        this.parametersChangeEvent.emit(new Parameter(this.travelTime,this.transportation,this.minBudget,this.maxBudget));
    }


    private initSliderView():void {

        //$("#budget-slider").ionRangeSlider();

        var slider = document.getElementById('budget-slider');
        noUiSlider.create(slider, {
            start: [this.minBudget, this.minBudget],
            connect: true,
            step: 1,
            range: {
                'min': [200],
                'max': [10000]
            }
        });

        slider.noUiSlider.on('change', function(){
            var values=slider.noUiSlider.get();
            this.minBudget=values[0];
            this.maxBudget=values[1];
            console.log("Value changed "+this.minBudget+" "+this.maxBudget);
            this.parametersChangeEvent.emit(new Parameter(this.travelTime,this.transportation,this.minBudget,this.maxBudget));
        });
    }
}

