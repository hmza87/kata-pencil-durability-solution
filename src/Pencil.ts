import Paper from "./Paper.ts";

export default class Pencil {

    initial_point_durability:number = 0;
    point_durability:number = 0;

    initial_length:number = 0;
    length:number = 0;

    initial_eraser_durability:number = 0;
    eraser_durability:number = 0;



    /*
    * @param point_durability initial value of the point, will be set on every sharpening
    * @param length number of times this pencil can be sharpened
    * @param eraser_durability number of chars (non-whitespace) this pencil eraser can remove
    * @param endIndex index on which the erasing stops
    * */
    constructor (point_durability:number = 0, length:number = 0, eraser_durability:number = 0) {
        this.initial_point_durability = point_durability;
        this.point_durability = point_durability;

        this.initial_eraser_durability = eraser_durability;
        this.eraser_durability = eraser_durability;

        this.length = length;
        this.initial_length = length;

    }

    /*
    * Calculates degradation value for a character
    * @param char a character to calculate its degradation value
    * @returns number represents the value of degradation
    * */
    getDegradationValue(char:string):number{

        if(/\s/.test(char)){ // test for any whitespace
            return 0;
        }else if(char.toLowerCase() === char){ // test for lowercase
            return 1;
        }else if(char.toUpperCase() === char){ // test for uppercase
            return 2;
        }

        // TODO: improve?
        return 1;
    }


    /*
    * Handle writing logic, degrading pencil and writing on paper
    * @param paper on which the content will be writen
    * @param content represents text to write
    * @returns string represents the actual text written on the paper
    * */
    write(paper:Paper, content:string){

        let textToWrite = "";

        for(const char of content){

            const degradation = this.getDegradationValue(char);

            if(this.point_durability >= degradation){
                textToWrite += char;
                this.point_durability -= degradation;
            }else{
                textToWrite += " ";
            }

        }

        return paper.write(textToWrite);
    }

    /*
    * Sharpen the pencil
    * @returns bool represents whether the pencil was sharpened or not
    * */
    sharpen():boolean{
        if(this.length > 0){

            this.point_durability = this.initial_point_durability;
            this.length -= 1;
            return true;
        }

        // pencil length is short, therefore cannot be sharpened
        return false;
    }

    /*
    * Erase text
    * @param paper represents the paper to use
    * @param content represents text to remove
    * @returns bool represents whether the text was removed or not
    * */
    erase(paper:Paper, content:string){

        if(this.eraser_durability === 0) return false;

        // flipped indexes to start counting erasing from right;
        let startIndex = paper.getContent().lastIndexOf(content) + content.length;
        let endIndex = startIndex;

        for(let i = (content.length - 1); i >= 0; i--){
            const char = content[i];

            if(/\s/.test(char)){ // whitespace doesn't affect durability

            }else{
                this.eraser_durability -= 1;
            }

            endIndex -= 1;

            if(this.eraser_durability === 0){
                break;
            }
        }


        paper.erase(endIndex, startIndex); // flip indexes to erase now from left to right

    }

    /*
    * Edit text on paper
    * @param paper represents the paper to use
    * @param content represents text to write
    * @returns bool represents whether the text modified or not
    * */
    edit(paper:Paper, content:string){

        // find an erased space, (multiple whitespaces)
        const spacesMatch = paper.getContent().match(/\s+/);

        if(!spacesMatch){
            console.error("No spaces found for content to be edited");
        }

        const startIndex = (spacesMatch?.index!) + 1; // shift starting point after first space
        let editContent = "";

        for(let char of content){
            const degration = this.getDegradationValue(char);
            if(this.point_durability >= degration){
                editContent += char;
            }else{
                break;
            }
        }

        return paper.editContent(editContent, startIndex);
    }


}