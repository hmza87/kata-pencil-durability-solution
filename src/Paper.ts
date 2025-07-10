export default class Paper {

    private content :string;

    constructor(content :string = "") {
        this.content = content;
    }

    getContent(){
        return this.content;
    }

    write(content:string){
        this.content = content;

        return content;
    }

    erase(startIndex:number, endIndex:number){



    }

    updateContent(content:string, startIndex:number){



    }
}