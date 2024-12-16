
class Departement{
    // name: string;
    protected employees:string[] = [];
    constructor(private id:string, public name: string){
        // this.name = name;
    }

    // describe(){
    //     console.log(`The departemnt is ${this.name}` );
    // }

    //this should always refer to an instance that based on department class
    describe(this: Departement){
        console.log(`The departemnt is ${this.name}` );
    }

    addEmployee(employee: string){
        this.employees.push(employee);
    }

    printEmployeeInfo(){
        console.log(this.employees.length);
        console.log(this.employees);
    }

}

const accounting = new Departement('1', "accounting");
console.log(accounting);

accounting.describe(); //The departemnt is accounting

const accountingCopy = {describe: accounting.describe};
// accountingCopy.describe(); //The departemnt is undefined
//beacause this is not pointing to the accounting object
//instead, it is pointing to the thing which is responsible for calling a method
//it doesn't have a name, so it should be undefined
accounting.addEmployee("Max");
accounting.addEmployee("Anna");
accounting.printEmployeeInfo();

//shorthand initialization 
class Student{
    //by default all properties are public but you should make it explicit when using them as params in constructor
    //read-only modifier
    //they should not change after initialization 
    constructor(public name: string, private readonly id: string ){

    }
}
const student = new Student("Lexie", "0091");
console.log(student);

//inheritence: can only inherit one class
class ITDepartement extends Departement{
    admins: string[]
    //whenever the class inherited from a super class wants to have its
    //own constructor, it have to add super in the inheriting class
    constructor(id:string, admins: string[]){
        super(id, "IT");
        //super class have to be called before anything
        this.admins = admins;
    }

}

const it = new ITDepartement('3',["Lexie"]);
console.log(it);

//override properties & protected modifier
//private: only the class itself is able to see, the class inherited is not able to see
//protected: inheriting class can also see
class accountingDepartment extends Departement{
    private reports: string[];
    //static peoperty : all instances will have the same value
    static fiscalYear = 2020;
     constructor(id: string, reports: string[]){
        super(id, 'Accounting');
        this.reports = reports;
        //when the property is static
        // console.log(this.fiscalYear);//ERROR
        console.log(accountingDepartment.fiscalYear);
     }
     //getter and setter
     get getReport (){
        return this.reports;
     }
     set setReport(value: string[]){
        this.reports = value;
     }


     //override the method in base class
     addEmployee(employee: string): void {
        if(employee === 'Max'){
            return;
        }
        this.employees.push(employee);
     }
}

const new_accounting = new accountingDepartment('5', ['double entry']);
new_accounting.addEmployee('Max');
new_accounting.addEmployee('Anna');

console.log(new_accounting);
