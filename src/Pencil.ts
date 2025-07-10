import Paper from "./Paper.ts";

export default class Pencil {

    initial_point_durability:number = 0;
    point_durability:number = 0;
    length:number = 0;
    initial_eraser_durability:number = 0;
    eraser_durability:number = 0;



    constructor (point_durability:number = 0, length:number = 0, eraser_durability:number = 0) {
        this.initial_point_durability = point_durability;
        this.point_durability = point_durability;

        this.initial_eraser_durability = eraser_durability;
        this.eraser_durability = eraser_durability;
        this.length = length;

    }


    // should calculate degradings and then write what it can with the current lenght
    write(paper:Paper, content:string){
        //TODO: implement the calculations
        return paper.write(content);
    }

    sharpen(){

    }

    erase(paper:Paper, content:string){

    }

    edit(paper:Paper, startIndex: number, content:string){

    }


}