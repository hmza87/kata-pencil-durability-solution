export default class Paper {

    /*
    Will hold the actual content on the paper, better not to be accessed directly outside this class
    */
    private content :string;


    /*
    * @param content the default content on the paper this variable is usefull to instantiate a paper with content on it already
    * */
    constructor(content :string = "") {
        this.content = content;
    }

    /*
    * @returns content of the paper
    * */
    getContent():string{
        return this.content;
    }

    /*
    * @param content to be writen on the paper
    * @returns content that was just writen
    * */
    write(content:string):string{
        this.content += content;

        return content;
    }

    /*
    * Directly erases content from paper
    * @startIndex index from which the erasing starts
    * @endIndex index on which the erasing stops
    * */
    erase(startIndex:number, endIndex:number){
        //basic validation
        if(startIndex < 0 || startIndex > endIndex){
            console.error("Invalid indexes provided.")
            return false;
        }

        // breaking content to array for clarity & ease of control
        const contentArr = this.content.split("");

        for(let i = startIndex; i < endIndex; i++){
            contentArr[i] = " ";
        }

        this.content = contentArr.join("");

        return true;

    }

    /*
    * Directly modifies content on paper
    * @content content to put
    * @startIndex index from which the erasing starts
    * */
    editContent(content:string, startIndex:number){

        // basic validation
        if(startIndex < 0 || startIndex > (this.content.length - 1)){
            console.error("Invalid index provided.")
            return false;
        }


        const contentArr = this.content.split("");

        let writingIndex = 0;

        while (writingIndex < content.length){

            const charOnPaper = contentArr[startIndex + writingIndex];

            if(charOnPaper === ' '){
                contentArr[startIndex + writingIndex] = content[writingIndex];
            }else{
                contentArr[startIndex + writingIndex] = '@';
            }

            writingIndex++;

        }

        this.content = contentArr.join("");

        return true;

    }
}