// type inference
//if there is no specific type assigned to a variable, TypeScript will infer the type based on the value assigned to it.
const person ={
    name: 'Smith',
    age: 30
}
//person is inferred as {name: string, age: number}

//type annotation
//explicitly specify the type of a variable
const person1: {
    name: string;
    age: number;
    hobbies: string[];
} = {
    name: 'John',
    age: 30,
    hobbies: ['Hiking', 'Swimming']
}

// array type
let favActivities: string[];
favActivities = ['Sports', 'Cooking'];
//or we can have mix of types
let favActivities_any: any[];
favActivities_any = ['Sports', 1];

for(const hobby of person1.hobbies){
    console.log(hobby.toUpperCase()); //we can acces string methods
    //console.log(hobby.map()); //error
}

//tuples
//fixed length array with fixed types
//a special array which only contain two elements
const role: [number, string] = [2, 'author'];
//but push is allowed
role.push('admin');
//role[1] = 10; //error
// console.log(role);

//enum
//enum is a way to give more friendly names to sets of numeric values
enum Role{ADMIN =5, READ_ONLY=1, AUTHOR=2};
//enum Role{ADMIN, READ_ONLY, AUTHOR}; //0, 1, 2
const person2 = {
    name: 'Smith',
    age: 30,
    role: 5
}
if(person2.role === Role.ADMIN){
    console.log('Admin');
}