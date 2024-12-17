
//an interface with have no implementation at all 
//while for abstract class, iy can include both abstract and implemented methods
//the interface cant have public/private but it has readonly which can only be set up once
interface Greetbale{
    readonly name: string,
    
    greet(name: string): void;
}

//one class can implment many different interface
class Person implements Greetbale{
    name:string;
    constructor(n:string){
        this.name = n;

    }
    greet(phrase:string){
        console.log(phrase + " " + this.name);
    }
}
//the type can be the same interface while the class can be different
let user1: Greetbale;
user1 = new Person('David');
user1.greet('Hi, I am ');

//the interface can extends interface as well
interface Winter{
    location: string
}
interface Snow extends Winter{
    tempareture: string;
}
class currentSnow implements Snow{
    location:string;
    tempareture: string;
    constructor(loc: string, temp: string){
        this.location = loc;
        this.tempareture = temp;
    }
}

//we can also use interface as a function type
interface addFn{
    (a:number, b:number): number;
}
let add: addFn;
add = (n1:number, n2:number)=>{
    return n1 + n2;
}
//optional parameters & properties
//by adding a question mark after the property name, it becomes an optional type for classes that extend the Named
// and the default value will be undefined
interface Named{
    name?:string
    greet(name?: string):void;
}
class Toy implements Named{
    color?: string;
    constructor(n?: string){
        if(n){
            this.color = n;
        }
    }
    greet(name?:string){
        if(name){
            console.log("hi" + name);
        }else{
            console.log('welcome!');
        }
    }
}

const barbie = new Toy();
barbie.greet('barbie');