//generic funtion 
// const names: Array = [] //ERROR because when we use generic type 
// we need to include the specific type
const names: Array<string> = [] // equals to const names: string[] = []


const promise: Promise<string> = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve("This is done")
    }, 2000);
});
//if we assign it a generic type, the result can use any methods related to string
promise.then(data=>{
    data.split('');
})


//create an generic function
//if there is no generic type
// function merge(objA:object, objB:object){
//     return Object.assign(objA, objB);
// }
// const mergeObj = merge({name:"Max"}, {age:30});
// console.log(mergeObj.name); //ERROR
//ts cant access to the properties, the only thing it knows is it is an object
//so we can give it a generic type
//the T and U can be any type of an object
function merge<T extends Object,U extends Object>(objA:T, objB:U){
    return Object.assign(objA,objB);
}
const mergedObj = merge({name:"Max", hobbies:["running, swimming"]},{age:30})
console.log(mergedObj.name);


interface Lenghthy{
    length:number;
}
function countAndPrint<T extends Lenghthy>(element:T):[T, string]{
    let description="There is no value."
    if(element.length===1){
        description="Got 1 element."

    }else if(element.length>1){
        description="Got" + element.length + "elements"

    }
    return [element, description];
}
// console.log(countAndPrint(1)); //ERROR
//because it only accept datatype with length as its property

//keyof
//we want to gurantee that the key is a property of the object
function extractAndConvert<T extends object, U extends keyof T>(obj:T,key:U){
    return obj[key];
}

// extractAndConvert({name:"Lexie"}, "age"); //ERROR


//generic class
class DataStorage<T extends string | number | boolean>{
    private data: T[] = [];
    addItem(item:T){
        this.data.push(item);
    }
    removeItem(item:T){
        if(this.data.indexOf(item) ===-1){
            return;
        }
        this.data.splice(this.data.indexOf(item),1);
    }
    getItems(){
        //return a copy of data
        //if we return this.data directly, the original data will be accessed
        return [...this.data];
    }
}
//we can assign a class with specific type when initializing it
const textStorage = new DataStorage<string>();
textStorage.addItem("Steven");
textStorage.addItem("Cair");
console.log(textStorage.getItems());

//but this wont work with object, because it use reference
// const objStorage = new DataStorage<object>();
// objStorage.addItem({name:"Max"});
// objStorage.addItem({name:"Lexie"});
// when removing the item, the obj we passed is assigned to a new reference 
//so this Max is not the same as the old one
//if no max found, it will remove the last element from the array
// objStorage.removeItem({name:"Max"});


//generic utility type
//partial type
interface CourseGoal{
    title:string;
    description: string;
    completeUntil:Date;

}

function createCourseGoal(title:string, description: string,completeUntil:Date):CourseGoal{
    // partial will make all properties in object optional temporarly
    //so we are able to assgin an empty object at the first place
    let courseGoal: Partial<CourseGoal> ={}
    //maybe have some validation here
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    //type casting
    return courseGoal as CourseGoal;
}

//we can also use Readyonly to lock an array/object
//so there is no way to add/ remove elements / properties
const peoples:Readonly<string[]> =["Anna", "Bill"];
// peoples.push("Max"); //ERROR
// peoples.pop();//ERROR
