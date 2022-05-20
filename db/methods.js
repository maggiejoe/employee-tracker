const connection = require('./connections');
class DB {
    constructor(connection) {
        this.connection = connection
    };

    getDepartment() {
        return this.connection.promise().query('SELECT * FROM department')
    }

    getRoles() {
        return this.connection.promise().query('SELECT * FROM role')
    }

    getEmployees() {
        return this.connection.promise().query('SELECT * FROM employees')
    }

    getCompany() {
        return this.connection.promise().query('SELECT * FROM employees LEFT JOIN role on employees.role_id = role.id LEFT JOIN department on role.department_id = department.id')
    }

    addEmployee(empObj) {
        return this.connection.promise().query('INSERT INTO employees SET ?', empObj)
    }

    addRole(roleObj) {
        return this.connection.promise().query('INSERT INTO role SET ?', roleObj)
    }
 };

 module.exports = new DB(connection);