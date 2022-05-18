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
        },
        // View departments selected
        {
            type: 'input',
            name: 'displayDepartment',
            message: 'view departments selected',
            when: ({choice}) => {
                if(choice === "View departments") {
                    return true
                }
                else {
                    return false
                }
            }
        },
        // View role selected
        {
            type: 'input',
            name: 'displayRole',
            message: 'view role selected',
            when: ({choice}) => {
                if(choice === "View roles") {
                    return true
                }
                else {
                    return false
                }
            }
        },
        // View employees selected
        {
            type: 'input',
            name: 'displayEmployee',
            message: 'view employees selected',
            when: ({choice}) => {
                if(choice === "View employees") {
                    return true
                }
                else {
                    return false
                }
            }
        },
        // Add a department selected
        {
            type: 'input',
            name: 'addDepartment',
            message: 'Please enter the name of the department you would like to add',
            when: ({choice}) => {
                if(choice === "Add a department") {
                    return true
                }
                else {
                    return false
                }
            }
        },
        // Add role selected
        {
            type: 'input',
            name: 'addRole',
            message: 'Please enter the name of the role you would like to add',
            when: ({choice}) => {
                if(choice === "Add a role") {
                    return true
                }
                else {
                    return false
                }
            }
        },
        // Add an employee selected
        {
            type: 'input',
            name: 'addEmployee',
            message: 'Please enter the name of the employee you would like to add',
            when: ({choice}) => {
                if(choice === "Add an employee") {
                    return true
                }
                else {
                    return false
                }
            }
        },
        // Update an employee's role selected
        {
            type: 'input',
            name: 'updateEmployee',
            message: 'Please enter the updated name of the role you would like to add',
            when: ({choice}) => {
                if(choice === "Update an employee") {
                    return true
                }
                else {
                    return false
                }
            }
        }
    ])
}

initializeApp()


// Display data from one of the tables
// const sql = `SELECT * FROM employee`
// db.query(sql, (err, row) => {
//     if(err) {
//         res.status(400).json({error: err.message})
//         return
//     }
//     console.table(row)
// })