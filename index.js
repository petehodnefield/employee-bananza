const db = require('./db/connection')
const inquirer = require('inquirer')
const cTable = require('console.table')

function initializeApp() {

    // Options to display departments, roles, employees
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please pick one:',
            choices: ['View departments', 'Add a department', 'View roles','Add a role', 'View employees',  'Add an employee', 'Update an employee']
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
            updateEmployee()
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
    const sql = `SELECT role.title, role.salary, departments.name AS Department
                FROM role
                INNER JOIN departments ON role.department_id = departments.id`
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
    const sql = `SELECT employee.*, role.title, departments.name AS Department
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN departments ON department_id = departments.id;`
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
            type: 'list',
            name: "employeeRole",
            message: "Please select the role of the employee you are adding",
            choices: roleChoices()
        }
    ])
    .then(employee => {
        let roleYaya;
        if(employee.role_id === 'Accountant') {
            roleYaya += 1
        }
        const sql = `INSERT INTO employee (first_name, last_name, role_id) 
        VALUES(?, ?, ?)`;
        const params = [employee.employeeFirstName, employee.employeeLastName, roleYaya]

        db.query(sql, params, (err, row) => {
            if(err) {
            console.log(err)
            return
        }
        console.log('Success! Role added.')
        initializeApp()
        })
    })
}

function departmentChoices() {
       // Diplay the current department names
       let emptyArray = []
       const sql = `SELECT name FROM departments`
       db.query(sql, (err, row) => {
           if(err) {
               console.log(err)
               return
           }
        //    Grab department names from each index
           const isolatedNames = row.map(x => x.name)
        //    Push departments into empty array to return department values
           isolatedNames.forEach(element => emptyArray.push(element))
        })
        return emptyArray
}

function addRole() {
    inquirer.prompt([
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
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Which department does this role belong to?',
            choices: departmentChoices()
        }
    ])
    .then(role => {
        let monger;
        if(role.roleDepartment === 'Sales') {
            monger = 1
        }
        else if(role.roleDepartment === 'Engineering') {
            monger = 2
        }
        if(role.roleDepartment === 'Finance') {
            monger = 3
        }
        if(role.roleDepartment === 'Legal') {
            monger = 4
        }
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES(?, ?, ?) `;
        const params = [role.roleTitle, role.roleSalary, monger]

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

// Function t
function grabEmployees() {
     let emptyArray = []
     const sql = `SELECT first_name FROM employee`
     return new Promise((resolve, reject) => {
        db.query(sql, (err, row) => {
            if(err) {
                console.log(err)
                return
            }
            else{
                resolve(result)
            }
     }
     )
     
        //  TODO: why does row.first_name return undefined?
    //      console.log(row.first_name)
    //   //    Grab department names from each index
    //      const isolatedFirstNames = row.map(x => x.first_name)
    //   //    Push departments into empty array to return department values
    //      isolatedFirstNames.forEach(element => emptyArray.push(element))
      })

      return emptyArray
}



function updateEmployee(employees) {
  
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeUpdatedName',
            message: 'Please select the employee you want updated',
            choices: ['Morgan', 'Mahalik', 'Harold', 'Lucy', 'Hannah', 'Lucy', 'Nick']
        },
        {
            type: 'list',
            name: 'employeeUpdatedRole',
            message: 'Please select the updated role of the employee',
            choices: roleChoices()
        }
    ])
    .then(data => {
        let role;
        if(data.employeeUpdatedRole === 'Accountant') {
            role = 1
        }
        const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?`;
        const params = [role, data.employeeUpdatedName]

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

function roleChoices() {
    // Diplay the current department names
    let emptyArray = []
    const sql = `SELECT title FROM role`
    db.query(sql, (err, row) => {
        if(err) {
            console.log(err)
            return
        }
     //    Grab department names from each index
        const isolatedRoles = row.map(x => x.title)
     //    Push departments into empty array to return department values
        isolatedRoles.forEach(element => emptyArray.push(element))
     })
     console.log(emptyArray)
     return emptyArray
}

initializeApp()

// askInfo()
// Display data from one of the tables
