const DB = require('./db/methods');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');
const { addEmployee } = require('./db/methods');

const mainMenu = () => {
    inquirer.prompt({ 
        type: 'list',
        message: 'What action would you like to take?',
        name: 'direction',
        choices: [
            'Show Departments',
            'Show Roles',
            'Show Employees',
            'Show Company',
            'Add New Employee',
            'Add New Role',
            'Add New Department',
            'Update An Employee Profile',
        ]

     }).then(responses => {
        switch (responses.direction) {
            case 'Show Departments':
                showDepartments();
              break;
            case 'Show Roles':
                showRoles();
              break;
            case 'Show Employees':
                showEmployees();
              break;
            case 'Show Company':
                showCompany();
              break;
            case 'Add New Employee':
                newEmployee();
            break;
            case 'Add New Role':
                newRole();
            break;
            case 'Add New Department':
                newDepartment();
            break;
            case 'Update An Employee Profile':
                updateEmployee();
            break;
          }
     });
};

const showDepartments = () => {
    DB.getDepartment().then(([ response ]) => {
        printTable(response);
        mainMenu();
    });
}

const showRoles = () => {
    DB.getRoles().then(([ response ]) => {
        printTable(response);
        mainMenu();
    });
}

const showEmployees = () => {
    DB.getEmployees().then(([ response ]) => {
        printTable(response);
        mainMenu();
    });
}

const showCompany = () => {
    DB.getCompany().then(([ response ]) => {
        printTable(response);
        mainMenu();
    });
}

const newEmployee = async() => {
    const [ roles ] = await DB.getRoles();
    const roleArr = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }
    ));
    const [ managers ] = await DB.getEmployees();
    const managerArr = managers.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id
    }
    ));
    inquirer.prompt([ {
        type: 'input',
        name: 'firstName',
        message: 'What is the new Employees First Name'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the new Employees Last Name?'
    },
    {
        type: 'list',
        name: 'roleTitle',
        message: 'What Role is assigned to this Employee?',
        choices: roleArr
    },
    {
        type: 'list',
        name: 'managerName',
        message: 'Who will manage this Employee?',
        choices: managerArr
    }
    ]).then(response => {
        var newEmployee = {
            first_name: response.firstName,
            last_name: response.lastName,
            role_id: response.roleTitle,
            manager_id: response.managerName,
        };
        console.log(newEmployee); 
        DB.addEmployee(newEmployee);
        mainMenu();
    })
}

const newRole = async() => {
    const [ dept ] = await DB.addRole();
    const deptArr = dept.map(({ id }) => ({
        value: id
    }
    ));
    inquirer.prompt([ {
        type: 'input',
        name: 'roleTitle',
        message: 'What new role would you like to create?'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for this new role?'
    },
    {
        type: 'list',
        name: 'deptChoice',
        message: 'What department will this role belong too?',
        choices: deptArr
    }
    ]).then(response => {
        var newRole = {
            title: response.roleTitle,
            salary: response.roleSalary,
            department_id: response.deptChoice
        };
        console.log(newRole);
        DB.addRole(newRole);
        mainMenu();
    })
}

// where & how to add an if statment to make sure that a role or department isn't added twice

const newDepartment = async() => {
    inquirer.prompt([ {
        type: 'input',
        name: 'newDept',
        message: 'What new department would you like to add?'
    }
    ]).then(response => {
        var newDept = {
            name: response.newDept
        };
        console.log(newDept);
        DB.addDept(newDept);
        mainMenu();
    })
}

const updateEmployee = async() => {
    const [ employees ] = await DB.getEmployees();
    const empArr = employees.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id
    }
    ));
    const [ roles ] = await DB.getRoles();
    const roleArr = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }
    ));
    const [ managers ] = await DB.getEmployees();
    const managerArr = managers.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id
    }
    ));
    inquirer.prompt([ {
        type: 'list',
        name: 'chooseEmployee',
        message: 'Which employee would you like to update?',
        choices: empArr
        // how to add in the ability for the user to change employee after user selects which employee they're updating
    },
    {
        type: 'confirm',
        name: 'changeName',
        message: 'Would you like to update the employees name?',
        choices: 'default'
    },
    {
        type: 'input',
        name: 'updatedFirstName',
        message: 'What is the updated first name of this employee?',
    },
    {
        type: 'input',
        name: 'updatedLastName',
        message: 'What is the updated last name of this employee?'
    },
    {
        type: 'confirm',
        name: 'changeRole',
        message: 'Would you like to update the employees role?',
        // what prompt to add a boolean?
        // if user selects true(yes) show choices to change role
        choices: 'default'
        // how to add in the ability for the user to change role after user selects which role they're updating
    },
    {
        type: 'list',
        name: 'chooseRole',
        message: 'What role would you like to update?',
        choices: roleArr
    },
    {
        type: 'list',
        name: 'updatedRole',
        message: 'Select the updated role.',
        choices: roleArr
    },
    {
        type: 'confirm',
        name: 'changeManager',
        message: 'Would you like to update the manager for this employee?',
        choices: 'default'
    },
    {
        type: 'list',
        name: 'chooseManager',
        message: 'What manager would you like to update?',
        choices: managerArr
    }
    ]).then(response => {
        var updatedEmployee = {

        }
    })
}

mainMenu();