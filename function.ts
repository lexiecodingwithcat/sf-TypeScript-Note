//specify the return type of the function
function add(n1: number, n2: number): number {
    return n1 + n2;
}

//if an function return nothing then return type is void
// we dont need to specify void
// function printResult(num:number):void{
//     console.log('Result: '+num);
// }
function printResult(num:number):undefined{
    console.log('Result: '+num);
}
printResult(add(5,12));

//function type are types taht describe a function regarding the parameters and the return value
let combinFn :(a:number, b:number) => number;

//callback function 
function handleAdd(n1:number, n2:number, cb:(num:number)=> void){
    const result = n1 + n2;
    cb(result);
}