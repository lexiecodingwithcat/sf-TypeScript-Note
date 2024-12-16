//unknown type
//we are able to store any type there without getting error
let userInput : unknown;
let userName: string;
userInput = 'Max';
// userName = userInpurt; //ERROR
//but if userInput is any, this works, cuz it will diable all type check in ts
//we need an extra type check to assign a unknown value to a value with a fixed type
if(typeof userInput === 'string'){
    userName = userInput;
}

//never type
function generateErr(message:string, code:number){
throw {message:message, errorCode:code}
}
const result = generateErr('An error occurred', 500)
console.log(result); //return nothing
//because the function throws an error which crashes the script
//it  never returns anything
//therefore the return type is never

const button = document.querySelector('button')!;
button.addEventListener('click', ()=>{
    console.log("clicked");
}) 
