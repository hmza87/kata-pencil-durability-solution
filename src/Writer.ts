import Paper from "./Paper.ts";
import Pencil from "./Pencil.ts";

export default class Writer {

    paper : Paper;
    pencil: Pencil;

    /*
    * @param pencil_durability initial value of the point of the pencil, will be set on every sharpening
    * @param pencil_length number of times this pencil can be sharpened
    * @param pencil_eraser_durability number of chars (non-whitespace) this pencil eraser can remove
    * @param initial_paper_content if the paper has any text on it already
    * */
    constructor(
        pencil_durability : number,
        pencil_length : number,
        pencil_eraser_durability : number,
        initial_paper_content : string = "",
    ) {

        this.paper = new Paper(initial_paper_content);
        this.pencil = new Pencil(pencil_durability, pencil_length, pencil_eraser_durability);

    }


    /*
    * @returns content of the paper
    * */
    getPaperContent(){
        return this.paper.getContent();
    }

    /*
    * @param content to be writen on the paper
    * @returns content that was just writen
    * */
    writeContent(content:string){
        return this.pencil.write(this.paper, content);
    }

    /*
    * Uses the pencil eraser to erase content from paper
    * @param content represents text to erase
    * @returns bool represents whether the text was removed or not
    * */
    eraseContent(content:string){
        return this.pencil.erase(this.paper, content);
    }

    /*
    * Edit text
    * @param content represents text to write
    * @returns bool represents whether the text modified or not
    * */
    editContent(content:string){
        return this.pencil.edit(this.paper, content);
    }


}