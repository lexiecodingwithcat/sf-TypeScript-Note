//union type
function combin (input1: number | string, input2: number | string){
    let result: number | string;
    //runtime type check
    if(typeof input1 === 'number' && typeof input2 === 'number'){
        result =  input1 + input2;
    }else{
        result =  input1.toString() + input2.toString();
    }
    return result;
}
const combinedAges = combin(30, 23);
const combinedNames = combin('Max', 'Anna');
const combineMix = combin('Max', 30);
console.log(combinedAges);
console.log(combinedNames);
console.log(combineMix);

//literal type
//the resultConversion is a literal type
//it can only be 'as-number' or 'as-text', cannot be any other string or any other type
function add(input1: number | string, input2: number | string, resultConversion: 'as-number' | 'as-text'){
    let result: number | string;
    if(resultConversion === 'as-number'){
        result =  +input1 + +input2;
    }else{
        result = input1.toString() + input2.toString();
    }

}
//type alias or custom type
type Combinable = number | string;
const combinableName: Combinable = 'Max';