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
        else if(data.choice === 'Update an employee') {
            grabEmployees()
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
    const sql = `SELECT employee.*, role.title
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id;`
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
        const index = row.findIndex(x => x.name === 'Sales')
        console.log(index)
        question(row)
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
            type: 'input',
            name: "employeeRole",
            message: "Please select the role of the employee you are adding",
            
        }
    ])
    .then(employee => {
        let role;
        if(employee.employeeRole === "Accountant") {
            role = 1
        }
        else if(employee.employeeRole === "Social Media Team") {
            role = 2
        }
        else if(employee.employeeRole === "Factory Worker") {
            role = 3
        }
        else if(employee.employeeRole === "Graphic Designer") {
            role = 4
        }
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
            choices: [1, 2, 3]
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
        VALUES(?, ?, ?) `;
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

function grabEmployees() {
      // Ask them which employee they want to update
      const pullData = `SELECT first_name FROM employee`
      db.query(pullData, (err, row) => {
          if(err) {
              console.log(err)
          }
        //   Grabs the first names of all employees
        const isolatedNames = row.map(x => x.first_name)
        updateEmployee(isolatedNames)
      })
}
function updateEmployee(employees) {
  
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeUpdatedName',
            message: 'Please select the employee you want updated',
            choices: [employees[0], employees[1], employees[4]]
        },
        {
            type: 'list',
            name: 'employeeUpdatedRole',
            message: 'Please select the updated role of the employee',
            choices: [1, 2, 3]
        }
    ])
    .then(data => {
        console.log(data)
        const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?`;
        const params = [data.employeeUpdatedRole, data.employeeUpdatedName]

        db.query(sql, params, (err, result) => {
            if(err) {
                console.log(err)
                return
            }
            console.log(result)
            displayEmployees()
        })
    })
    
}

initializeApp()

// askInfo()
// Display data from one of the tables
