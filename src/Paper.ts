export default class Paper {

    private content :string;

    constructor(content :string = "") {
        this.content = content;
    }

    getContent(){
        return this.content;
    }

    write(content:string){
        this.content += content;

        return content;
    }

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