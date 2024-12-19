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