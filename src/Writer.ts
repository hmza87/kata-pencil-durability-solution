import Paper from "./Paper.ts";
import Pencil from "./Pencil.ts";

export default class Writer {

    paper : Paper;
    pencil: Pencil;

    constructor(
        pencil_durability : number,
        pencil_length : number,
        pencil_eraser_durability : number,
        initial_paper_content : string = "",
    ) {

        this.paper = new Paper(initial_paper_content);
        this.pencil = new Pencil(pencil_durability, pencil_length, pencil_eraser_durability);

    }


    getPaperContent(){
        return this.paper.getContent();
    }

    writeContent(content:string){
        return this.pencil.write(this.paper, content);
    }

    eraseContent(content:string){
        return this.pencil.erase(this.paper, content);
    }

    editContent(content:string){
        return this.pencil.edit(this.paper, content);
    }


}