// Example of usage
// Class Writer make it simpler to instanciate a paper and pencil for writing.

import Writer from "./src/Writer";

const writer = new Writer(
    12, // Pencil initial Point Durability (refreshed on sharpening
    1, // Pencil length
    1000 // Pencil Eraser Durability
);

console.log('Writing : Hello World');
writer.writeContent("Hello World!"); // should write it on paper and cost 13 from durability and we have only 12

console.log(`Paper content : ${writer.paper.getContent()}`);

// Sharpen pencil
console.log('Sharpening ..');
writer.pencil.sharpen();

console.log({
    pencil_point : writer.pencil.point_durability,
    pencil_length : writer.pencil.length,
});

console.log('Erassing "Hello" ..');
writer.eraseContent("Hello");

console.log(`Paper content : ${writer.paper.getContent()}`);


console.log('Editing to "Bye World ..');
writer.editContent("Bye");

console.log(`Paper content : ${writer.paper.getContent()}`);

