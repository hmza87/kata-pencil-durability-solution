import Writer from "../src/Writer";
import {expect} from "vitest";

describe('Basic Write Text on paper', () => {

    /*
    As a writer
    1 - I want to be able use a pencil to write text on a sheet of paper
    so that I can better remember my thoughts
    2 - When the pencil is instructed to write a string of text on a sheet of paper, the paper should reflect the text that was written.
    */

    test("Write text on paper", ()=>{
        const writer = new Writer(1000, 10, 10);
        const contentToWrite = "Hello World";

        // 1 = the pencil should write the whole word, and then return the content writen on paper
        expect(writer.writeContent(contentToWrite)).toBe(contentToWrite);

        // 2 = the content writen should be on paper
        expect(writer.getPaperContent(), contentToWrite);
    });


    /*
     Text written by the pencil should always be appended to existing text on the paper.
     Thus, given a piece of paper with the text "She sells sea shells",
     when a pencil is instructed to write " down by the sea shore" on the paper,
     the paper will then contain the entire string (i.e. "She sells sea shells down by the sea shore").
    * */

    test("Write text on paper", ()=>{
        const writer = new Writer(1000, 10, 10, "She sells sea shells");
        const contentToWrite = "";

        //appending the rest of the text
        writer.writeContent(" down by the sea shore");

        // the text should be added to the paper existing text
        expect(writer.getPaperContent()).toBe("She sells sea shells down by the sea shore");

    });
});

describe('Point Degradation', () => {

    /*
    As a pencil manufacturer
    I want writing to cause a pencil point to go dull
    so that I can sell more pencils
    */

    test("Pencil go dull", ()=>{


        /*
            when a pencil with a point durability of four is instructed to write the string "text",
            the paper will contain the entire string.
            But if a pencil with point durability of four is instructed to write the string "Text",
            the paper will only show "Tex ".
         */
        // text should be writen in full
        let writer = new Writer(4, 10, 0);
        writer.writeContent("text");
        expect(writer.getPaperContent()).toBe("text");

        // 2 = the content writen should be incomplete
        writer = new Writer(4, 10, 0);
        writer.writeContent("Text");
        expect(writer.getPaperContent()).toBe("Tex ");
    });


    /*
     Writing spaces and newlines expends no graphite, therefore "writing" these characters should not affect the pencil point.
    * */

    test("Whitespaces should not affect pencil point", ()=>{
        const writer = new Writer(4, 10, 10);
        const spaces = `  `;
        const newLine = ` 
            `;

        //write the spaces
        writer.writeContent(spaces);

        // content should be writen while pencil point should not be affected
        expect(writer.getPaperContent()).toBe(spaces);
        expect(writer.pencil.point_durability).toBe(4);

        //write the new lines
        writer.writeContent(newLine);

        // content should be added to paper while pencil point should not be affected
        expect(writer.getPaperContent()).toBe(spaces + newLine);
        expect(writer.pencil.point_durability).toBe(4);

    });
});

describe('Sharpen', () => {

    /*
    As a writer
    I want to be able to sharpen my pencil
    so that I can continue to write with it after it goes dull
    */

    test("Sharpen Pencil", ()=>{
        /*
            When a pencil is sharpened,
            it regains its initial point durability and can write more characters
            before it goes dull again
         */

        let writer = new Writer(4, 10, 0);
        //4 chars are writen, point now should be 0
        writer.writeContent("text");
        // sharpen pencil so now the length needs to be 9
        writer.pencil.sharpen();

        expect(writer.pencil.length).toBe(9);

        /*
           When a pencil's length is zero, then sharpening it no longer restores its point durabliity.
        * */
        //init new writer with pencil point durability = 4 and lenght = 0
        writer = new Writer(4, 0, 0);

        // write 4 chars to go dull
        writer.writeContent("text");

        // sharpening should not affect point and length
        expect(writer.pencil.length).toBe(0);
        expect(writer.pencil.point_durability).toBe(0);

    });

});

describe('Eraser', () => {

    /*
    As a writer
    I want to be able to erase previously written text
    so that I can remove my mistakes
    */

    test("Basic Erase of text", ()=>{
        /*
            When the pencil is instructed to erase text from the paper,
            the last occurrence of that text on the paper will be replaced with empty spaces.
         */

        let writer = new Writer(1000, 10, 1000);
        // let's write something to erase
        writer.writeContent("How much wood would a woodchuck chuck if a woodchuck could chuck wood?");

        // now we erase "chuck"
        writer.eraseContent("chuck");

        // the word "chuck" should be replaced with spaces
        expect(writer.getPaperContent()).toBe("How much wood would a woodchuck chuck if a woodchuck could       wood?");

        // we erase the second word "chuck"
        writer.eraseContent("chuck");

        // the second word "chuck" should be also replaced with spaces
        expect(writer.getPaperContent()).toBe("How much wood would a woodchuck chuck if a wood      could       wood?");


    });

});

describe('Eraser Degradation', () => {

    /*
       As a pencil manufacturer
        I want a pencil eraser to eventually wear out
        so that I can sell more pencils
     */

    test("Basic Degradation", ()=>{
        /*
           if a pencil's eraser has remaining durability of three,
           and it is instructed to erase the word "Bill" from "Buffalo Bill",
           then the text remaining on the paper is "Buffalo B   ".
         */

        let writer = new Writer(1000, 10, 3, "Buffalo Bill");

        // now try to erase the word "Bill"

        writer.eraseContent("Bill");

        // the second word "chuck" should be also replaced with spaces
        expect(writer.getPaperContent()).toBe("Buffalo B  ");


    });

});

describe('Editing', () => {

    /*
    As a writer
    I want to be able to edit previously written text
    so that I can change my writing without starting over
    */

    test("Text Edit", ()=>{
        /*
            if the paper contains the text "An       a day keeps the doctor away",
            a pencil can can be instructed to write the word "onion" in the white space gap,
            so the text reads "An onion a day keeps the doctor away".
         */

        let writer = new Writer(1000, 10, 1000);
        // let's write something to edit
        writer.writeContent("An apple a day keeps the doctor away");

        // now we erase "apple"
        writer.eraseContent("apple");

        // now let's modify apple with onion
        writer.editContent("onion");

        // content needs to have word  onion instead of apple
        expect(writer.getPaperContent()).toBe("An onion a day keeps the doctor away");


    });


    /*
    Existing text on the page cannot 'shift' to make room for new text.
    If the new text is longer than the allocated whitespace and thus would collide with other existing
    non-whitespace characters on the page, these character collisions should be represented by the "@" character.
    */

    test("Edit collision", ()=>{
        /*
            if the paper contains the text "An       a day keeps the doctor away",
            a pencil can can be instructed to write the word "onion" in the white space gap,
            so the text reads "An onion a day keeps the doctor away".
         */

        let writer = new Writer(1000, 10, 0);
        // let's write something to edit
        writer.writeContent("An apple a day keeps the doctor away");

        // now we erase "apple"
        writer.eraseContent("apple");

        // now let's modify apple with artichoke
        writer.editContent("artichoke");

        // content needs to have word artichoke needs to be in collision with "a day"
        expect(writer.getPaperContent()).toBe("An artich@k@ay keeps the doctor away");


    });

});