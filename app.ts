// intersection type 
type Admin = {
    name:string,
    privileges: string []
};

type Employee = {
    name: string,
    startDate: Date
};
type ElevatedEmployee = Admin & Employee;
const e1 : ElevatedEmployee = {
    name:"Max",
    privileges:["create-server"],
    startDate: new Date()
}

// console.log(e1);
type Combinable = string | number ;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; //can only store NUMBER

function add (n1: Combinable, n2:Combinable){
// type guard 1
if(typeof n1 === 'string' || typeof n2 === 'string'){
    return n1.toString() + n2.toString();
}
    return n1 + n2;
}

type UnkownEmployee = Employee | Admin;
function printEmployeeInfo (emp: UnkownEmployee){
    console.log('name:' + emp.name);
    //type guard 2
    //since not both Employee and Admin have priviledges
    //we need to check whether privilege is a property in emp
    if('privileges' in emp){
    console.log('privileges:' + emp.privileges);
    }
}

printEmployeeInfo(e1);

class Car{
    drive(){
        console.log('Driving');
    }
}

class Truck{
    drive(){
        console.log('driving a truck');
    }
    loadCargo(amount: number){
        console.log('Loading cargo ...' + amount);
    }
}
type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();
function useVehicle(v: Vehicle){
    //we can call directly the functions that both class have
    v.drive();
    //type guard
//     if('loadCargo' in v){
//     v.loadCargo(30);
// }
    if(v instanceof Truck){
        v.loadCargo(30);
    }
}
//we can use instanceof in classes but no interface since interface wont be compiled in JS file
useVehicle(v2);

//discriminated union 
interface Bird{
    //literal types, the animal must be bird
    type:'bird';
    flyingSpeed: Number;
}
interface Horse{
    type:'horse';
    runningSpeed:Number;
}
type Animal = Bird | Horse;
function moveAnimal(animal: Animal){
    let speed;
    switch(animal.type){
    case 'bird':
        speed = animal.flyingSpeed;
        break;
    case 'horse':
        speed = animal.runningSpeed;
        break;
    }
    console.log('Moving at speed:'+ speed);
}
const a1 : Animal = {
    type: 'bird',
    flyingSpeed:30
}
moveAnimal(a1);

//type casting
// ts doesn't know this is an input element, it only knows this is a HTMLelement
// const userInputElement = document.getElementById('user-input');
//so we have to covert it to input element
//option 1: 
// const userInputElement = <HTMLInputElement> document.getElementById('user-input');
//option 2:
const userInputElement = document.getElementById("user-input")! as HTMLInputElement;
userInputElement.value = 'Hi there';

//if we are not sure whether the element currenly is null or not
const userInput = document.getElementById("user-input");
//check null
if(userInput){
    (userInput as HTMLInputElement).value = 'hi there';
}


//index type
// when we need an object but dont sure what and how many properties will include
interface ErrorContainer{
    //the name of the property should be string
    //and also the value of it should be string
    [prop: string]:string;
    //if so we can't have properties with other types
    // id:number;  //ERROR

}

const errorBag: ErrorContainer={
    email:"an email",
    // number can be interpreted as string, so using number as key type is ok, but reverse it wont work
    1: 'Not a valid email'
}


//function overloads
//if the function is union type, the return value is union type as well
type addCombinable= string | number; 
function addNum(a:number, b:number):number;
function addNum(a:string, b:string):string;
function addNum(a:number, b:string):string;
function addNum (a: addCombinable, b: addCombinable ){
    if(typeof a === 'string' || typeof b === 'string'){
        return a.toString()+b.toString
    }
    return a + b;
}
const result = addNum('Max', 'Well');
//so the result is able to use methods for string
result.split('');