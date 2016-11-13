/**
 * Created by NikhilVerma on 13/11/16.
 */

export class Parameter {
    travelTime:number=1;
    transportation:number=1;
    minBudget:number=2000;
    maxBudget:number=6000;

    constructor() {
    }


    constructor(travelTime:number, transportation:number, minBudget:number, maxBudget:number) {
        this.travelTime = travelTime;
        this.transportation = transportation;
        this.minBudget = minBudget;
        this.maxBudget = maxBudget;
    }
}