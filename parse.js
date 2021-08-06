const path = require('path');
const fs = require('fs');

let dictionaries = {};

const readTerms = (dir) => {
    //create array of directories
    const files = fs.readdirSync(path.join(__dirname, dir));
    
    //combine files for every directory
    for (const file of files){
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        let combinedBank = []

        if (stat.isDirectory()) {
            const terms = fs.readdirSync(path.join(__dirname, dir, file))
            
            //combining term banks
            for (term of terms){
                let addedTermsArray = require(path.join(__dirname, dir, file, term));
                combinedBank = [...combinedBank ,...addedTermsArray]
            }
        }

        //add to dictionary object
        dictionaries[file] = combinedBank;
    }
};

module.exports = () => {
    try {
        readTerms('dictionaryFiles')
    } catch (err) {
        console.error('Error: Could not finish parsing dictionaryFiles');
        console.log(err);
    }

    return dictionaries
}


//console.log(dictionaries.banks1[2]);

/*let words = dictionaries.banks1
if (dictionaries.banks1 !== undefined){
    for (word of words){
        if (word[0] == '取引' || word[1] == '上手'){
            console.log(word);
        }
    }
}*/


/*
console.log(typeof testBank);

console.log(termBank[56])

//prints word at index 56
console.log(termBank[56][0]);

//prints pronunciation
console.log(termBank[56][1]);

//prints meaning of index 56 (which is an array)
let definitions = termBank[56][5]
for (definition of definitions){
    console.log(definition)
}

let number = 0x7FFFFFFF;
number+=1;
console.log(number);
*/