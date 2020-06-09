// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee"
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.email;
    }

    getEmail() {
        return this.role;
    }
    getRole() {
        return this.email;
    }
}

module.exports = Employee;