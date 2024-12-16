//one class can implment many different interface
var Person = /** @class */ (function () {
    function Person(n) {
        this.name = n;
    }
    Person.prototype.greet = function (phrase) {
        console.log(phrase + " " + this.name);
    };
    return Person;
}());
//the type can be the same interface while the class can be different
var user1;
user1 = new Person('David');
user1.greet('Hi, I am ');
var currentSnow = /** @class */ (function () {
    function currentSnow() {
    }
    return currentSnow;
}());
var add;
add = function (n1, n2) {
    return n1 + n2;
};
var Toy = /** @class */ (function () {
    function Toy(n) {
        if (n) {
            this.color = n;
        }
    }
    Toy.prototype.greet = function (name) {
        if (name) {
            console.log("hi" + name);
        }
        else {
            console.log('welcome!');
        }
    };
    return Toy;
}());
var barbie = new Toy();
barbie.greet('barbie');
