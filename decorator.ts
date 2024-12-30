//decorators execute when the class is defined not instantiated
//it runs when js finds the class definition (constructor function definition)
//1. class decorator
//1). using deorator without passing params
// function Logger(constructor:Function){
//     console.log("instantiate the class Person...");
// }

// @Logger
// class Person{
//     public name: string;
//     constructor(name:string){
//         this.name = name;
//         console.log("The name of this person is " + name);
//     }
// }
// const p = new Person("Jenna");

//2). using decorators by passing params
//the outside function is factory function
function Logger(logString: string){
    return function(constructor:Function){
        console.log(logString);
    }
}

function WithTemplate(template: string, hookId: string){
    // beacause the constructor is callable and construcable
    //so we convert the type to any if we want to use NEW 
    return function(constructor: any){
    
        const e = document.getElementById(hookId) as HTMLElement;
        const cat = new constructor("Meow meow");
        
        if(e){
            e.innerHTML=template;
            document.querySelector('h1')!.textContent=cat.getName;
        }

    }
}

// @Logger("creating a cat")
@WithTemplate('<h1>My cat obj</h1>','container')
class Cat{
    private name : string;
    constructor(name: string){
        this.name = name;
    }
    get getName():string{
        return this.name;
    }
}

//2.add decorator to the property
// target should be the prototype 
function Log(target:any, propertyName: string | Symbol){
    console.log('Property decorator');
    console.log(target, propertyName);
}

//3.accessor decorator
function Log2(target:any, name:string, descriptor: PropertyDescriptor){
    console.log('accessor decorator');
    console.log(descriptor);
    console.log(name);
}

//4.method decorator
function Log3(target:any, name:string, descriptor: PropertyDescriptor){
    console.log('method decorator');
    console.log(descriptor);
    console.log(name);
}

//5. parameter decorator
//position: the index of the parameter
function Log4(target:any, name: string | Symbol, position: number){
    console.log('Parameter decorator');
    console.log(target, name);
    console.log(position);
}

class Product{
    @Log
    title:string;
    private price: number;

    @Log2
    set setPrice(val:number){
        if(val >0){
            this.price = val;
        }else{
            throw new Error('Invalid price - should be positive');
        }
    }

    get getPrice(){
        return this.price;
    }

    constructor(t:string, p:number){
        this.title = t;
        this.price = p;
    }
    @Log3
    getPriceWithTax(@Log4 tax:number){
        return this.price * (1+tax);
    }
}

//class decorater can be used to change the constructor
function AddHeading(template: string, hookId: string){
    console.log("Using decorater to change heading content")
    // We tuen decorator function into a generic function and make it clear that this will finally be a constructor function by extends {new()}
    /*
    This part specifies that T must be a constructor function. 
    The new keyword indicates that T can be called with the new operator to create instances.
    (...args: any[]) means that this constructor can accept any number of arguments of any type (an array of arguments).
    The trailing {} indicates that the constructor returns an object of any shape (at least an object).
    This constructor will create an obj contains brand as its property
    */
    return function<T extends {new(...args:any[]):{brand:string}}> (originalConstructor: T){
        // we use class syntax sugar to return a new constructor
        return class extends originalConstructor{
            constructor(...args:any[]){
                // call the originalConstructor
                super(...args);
                //add new logic to the class
                // the heading should only be rendered to the DOM if the object has been instantiated
                const hookElement = document.getElementById(hookId);
                if (hookElement) {
                    hookElement.innerHTML = template;
                    document.querySelector('h1')!.textContent = this.brand;
                }
            }

        }
    }
}

@AddHeading('<h1>Hello World!</h1>', 'container')
class Coke{
    brand: string;
    constructor(b:string){
        this.brand = b;
    }
}
const pepsi = new Coke("Pepsi");

//decorator allows us to bind 
function AutoBind(target:any, fnName: string, descriptor: PropertyDescriptor){
    //get the method we want to add to the listener
    const originalMethod = descriptor.value;
    const adjDescriptor : PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        // thie getter actually wrapped the function into it
        get(){
            //extra logic that runs before the value is returned
            // "this" will refer to whatever is responsible for triggering this getter
            //and the getter method will be triggered by the concrete object which it belongs  
            //so it won't be overwritter by addEventListener, it will always point to the object which defined the getter
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}

//in normal javascript we have to bind the function with eventlistener
class Printer{
    message = "This works!";

    @AutoBind
    printMessage(){
        console.log(this.message);
    }
}
const p = new Printer();
const btn = document.querySelector('button')!;
// btn.addEventListener("click", p.printMessage); 
//when click it will be undefined unless:
btn.addEventListener("click", p.printMessage.bind(p));

//an example
/*
const validatorConfig: ValidatorConfig = {
    username: {
        required: ["required"], // username is required
        minLength: ["minLength", "5"], 
    },
    password: {
        required: ["required"], 
        minLength: ["minLength", "8"], 
        containsNumber: ["containsNumber"], 
    },
};
*/

interface ValidatorConfig{
    [property:string]:{
        [validatableProp: string]:string[]//["required", ....]
    }
}
const registeredValidators: ValidatorConfig = {}
//add validation 
function Reqiured(target:any, propName: string){
    // target.constructor.name is the name of the class
    /* Course:{
        title: ["required"]
    }
     */
    registeredValidators[target.constructor.name] ={
        // take the existing key value paris for that class and then add the new one
        ...registeredValidators[target.constructor.name],
        //the new proprty validation may contain more than one validation rules
        [propName] : [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}

function PositiveNumber(target: any, propName:string){
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]:[...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}
// this function will loop the resgiteredValidator to see whether current class has some restrictions on inputs
function validate(obj:any){
    //retrieve the validation configuration related to a specific object (obj) from the registeredValidators object, (we find Course:{})
    //cuz obj is an instance and we can see the original class by getting its constructor name
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    //if there is no congiuration, return ture, it means there is no validation need to be done
    if(!objValidatorConfig) return true;
    //if there is, we need to loop every validation requirement 
    let isValid = true;
    for(const prop in objValidatorConfig){
        //since each value is a string array, we also need to loop the array
        //sometimes they may have more than one rules like ["required", "positive"]
        for(const validator of objValidatorConfig[prop]){
            switch (validator){
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop]>0;
                    break;
            }
        }
    }
    return isValid;
}


class Course{
    @Reqiured
    title: string;
    @PositiveNumber
    price: number;
    constructor(t:string, p:number){
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement;
    
    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if(!validate(createdCourse)){
        alert('Invalid input, please try again!')
        return;
    }
    console.log(createdCourse);
})