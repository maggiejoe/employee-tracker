const DB = require('./db/methods');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');

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
        mainMenu();
    })
}

// how do you add the new employee to the employee table

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
            role_title: response.roleTitle,
            role_salary: response.roleSalary,
            department: response.deptChoice
        };
        console.log(newRole);
        mainMenu();
    })
}

const newDepartment = async() => {

}

const updateEmployee = async() => {

}

mainMenu();