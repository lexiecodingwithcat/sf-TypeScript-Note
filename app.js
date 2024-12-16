var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Departement = /** @class */ (function () {
    function Departement(id, name) {
        this.id = id;
        this.name = name;
        // name: string;
        this.employees = [];
        // this.name = name;
    }
    // describe(){
    //     console.log(`The departemnt is ${this.name}` );
    // }
    //this should always refer to an instance that based on department class
    Departement.prototype.describe = function () {
        console.log("The departemnt is ".concat(this.name));
    };
    Departement.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Departement.prototype.printEmployeeInfo = function () {
        console.log(this.employees.length);
        console.log(this.employees);
    };
    return Departement;
}());
var accounting = new Departement('1', "accounting");
console.log(accounting);
accounting.describe(); //The departemnt is accounting
var accountingCopy = { describe: accounting.describe };
// accountingCopy.describe(); //The departemnt is undefined
//beacause this is not pointing to the accounting object
//instead, it is pointing to the thing which is responsible for calling a method
//it doesn't have a name, so it should be undefined
accounting.addEmployee("Max");
accounting.addEmployee("Anna");
accounting.printEmployeeInfo();
//shorthand initialization 
var Student = /** @class */ (function () {
    //by default all properties are public but you should make it explicit when using them as params in constructor
    //read-only modifier
    //they should not change after initialization 
    function Student(name, id) {
        this.name = name;
        this.id = id;
    }
    return Student;
}());
var student = new Student("Lexie", "0091");
console.log(student);
//inheritence: can only inherit one class
var ITDepartement = /** @class */ (function (_super) {
    __extends(ITDepartement, _super);
    //whenever the class inherited from a super class wants to have its
    //own constructor, it have to add super in the inheriting class
    function ITDepartement(id, admins) {
        var _this = _super.call(this, id, "IT") || this;
        //super class have to be called before anything
        _this.admins = admins;
        return _this;
    }
    return ITDepartement;
}(Departement));
var it = new ITDepartement('3', ["Lexie"]);
console.log(it);
//override properties & protected modifier
//private: only the class itself is able to see, the class inherited is not able to see
//protected: inheriting class can also see
var accountingDepartment = /** @class */ (function (_super) {
    __extends(accountingDepartment, _super);
    function accountingDepartment(id, reports) {
        var _this = _super.call(this, id, 'Accounting') || this;
        _this.reports = reports;
        //when the property is static
        // console.log(this.fiscalYear);//ERROR
        console.log(accountingDepartment.fiscalYear);
        return _this;
    }
    Object.defineProperty(accountingDepartment.prototype, "getReport", {
        //getter and setter
        get: function () {
            return this.reports;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(accountingDepartment.prototype, "setReport", {
        set: function (value) {
            this.reports = value;
        },
        enumerable: false,
        configurable: true
    });
    //override the method in base class
    accountingDepartment.prototype.addEmployee = function (employee) {
        if (employee === 'Max') {
            return;
        }
        this.employees.push(employee);
    };
    //static peoperty : all instances will have the same value
    accountingDepartment.fiscalYear = 2020;
    return accountingDepartment;
}(Departement));
var new_accounting = new accountingDepartment('5', ['double entry']);
new_accounting.addEmployee('Max');
new_accounting.addEmployee('Anna');
console.log(new_accounting);
