const db = require('./db/connection')
const inquirer = require('inquirer')

function initializeApp() {

    // Options to display departments, roles, employees
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please pick one:',
            choices: ['View departments', 'View roles', 'View employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
        }
    ]).then(data => {
        if(data.choice === 'View departments') {
            displayDepartment()
        }
        else if(data.choice === 'View roles') {
            displayRoles()
        }
        else if(data.choice === 'View employees') {
            displayEmployees()
        }
        else if(data.choice === 'Add a department') {
            addDepartment()
        }
        else if(data.choice === 'Add a role') {
            addRole()
        }
        else if(data.choice === 'Add an employee') {
            addEmployee()
        }
       
        else{
        console.log(data)
        }
    })
}

function displayDepartment() {
    const sql = `SELECT id, name FROM departments`
    db.query(sql, (err, row) => {
        if(err) {
            console.log(err)
            return
        }
        console.table(row)
        initializeApp()
    })
    
    
}
function displayRoles() {
    const sql = `SELECT * FROM role`
    db.query(sql, (err, row) => {
        if(err) {
            console.log(err)
            return
        }
        console.table(row)
        initializeApp()

    })
    
}
function displayEmployees() {
    const sql = `SELECT * FROM employee`
    db.query(sql, (err, row) => {
        if(err) {
            console.log(err)

            return
        }
        console.table(row)
        initializeApp()

    })
    
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Please enter the name of the department you would like to add'
        }
    ])
    .then(department => {
        const sql = `INSERT INTO departments (name) 
        VALUES(?)`;
        const params = [department.departmentName]

        db.query(sql, params, (err, row) => {
            if(err) {
            console.log(err)
            return
        }
        displayDepartment()
        console.log('Success! Department added.')
        })
    })
}
function addRole() {
    const sql = `SELECT name FROM departments`
    db.query(sql, (err, row) => {
        if(err) {
            console.log(err)
            return
        }
        console.log(row)
        question()
    })
}
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'Please enter the first name of the employee you would like to add'
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'Please enter the last name of the employee you would like to add'
        },
        {
            type: 'choices',
            name: "employeeRole",
            message: "Please select the role of the employee you are adding",
            choices: ['Monger', 'yaya']
        }
    ])
    .then(employee => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id) 
        VALUES(?, ?, ?)`;
        const params = [employee.employeeFirstName, employee.employeeLastName, employee.employeeRole]

        db.query(sql, params, (err, row) => {
            if(err) {
            console.log(err)
            return
        }
        displayEmployees()
        console.log('Success! Role added.')
        })
    })
}

function question(yaya) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleDepartment',
            message: 'Which department does this role belong to?',
            
        },
        {
            type: 'input',
            name: 'roleTitle',
            message: 'Please enter the name of the role you would like to add'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Please enter the salary of the role you would like to add'
        },
       
    ])
    .then(role => {
        const sql = `INSERT INTO role (title, salary, department_id) 
        VALUES(?, ?, ?)`;
        const params = [role.roleTitle, role.roleSalary, role.roleDepartment]

        db.query(sql, params, (err, row) => {
            if(err) {
            console.log(err)
            return
        }
        displayRoles()
        console.log('Success! Role added.')
        })
    })
}
initializeApp()

// askInfo()
// Display data from one of the tables
