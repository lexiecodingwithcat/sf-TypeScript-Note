var e1 = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date()
};
function add(n1, n2) {
    // type guard 1
    if (typeof n1 === 'string' || typeof n2 === 'string') {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}
function printEmployeeInfo(emp) {
    console.log('name:' + emp.name);
    //type guard 2
    //since not both Employee and Admin have priviledges
    //we need to check whether privilege is a property in emp
    if ('privileges' in emp) {
        console.log('privileges:' + emp.privileges);
    }
}
printEmployeeInfo(e1);
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log('Driving');
    };
    return Car;
}());
var Truck = /** @class */ (function () {
    function Truck() {
    }
    Truck.prototype.drive = function () {
        console.log('driving a truck');
    };
    Truck.prototype.loadCargo = function (amount) {
        console.log('Loading cargo ...' + amount);
    };
    return Truck;
}());
var v1 = new Car();
var v2 = new Truck();
function useVehicle(v) {
    //we can call directly the functions that both class have
    v.drive();
    //type guard
    //     if('loadCargo' in v){
    //     v.loadCargo(30);
    // }
    if (v instanceof Truck) {
        v.loadCargo(30);
    }
}
//we can use instanceof in classes but no interface since interface wont be compiled in JS file
useVehicle(v2);
function moveAnimal(animal) {
    var speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed:' + speed);
}
var a1 = {
    type: 'bird',
    flyingSpeed: 30
};
moveAnimal(a1);
//type casting
// ts doesn't know this is an input element, it only knows this is a HTMLelement
// const userInputElement = document.getElementById('user-input');
//so we have to covert it to input element
//option 1: 
// const userInputElement = <HTMLInputElement> document.getElementById('user-input');
//option 2:
var userInputElement = document.getElementById("user-input");
userInputElement.value = 'Hi there';
//if we are not sure whether the element currenly is null or not
var userInput = document.getElementById("user-input");
//check null
if (userInput) {
    userInput.value = 'hi there';
}
var errorBag = {
    email: "an email",
    // number can be interpreted as string, so using number as key type is ok, but reverse it wont work
    1: 'Not a valid email'
};
function addNum(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString;
    }
    return a + b;
}
