var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptUser();
});

function promptUser() {
    inquirer.prompt({
        type: "list",
        choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Roles","View Employees","Update Employee Roles"],
        message: "what whould you like to do?",
        name: "userChoice"
    }).then(({ userChoice }) => {
        switch (userChoice) {
            case "Add Department":
                addDepartment()
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "View Department":
                viewDepart()
                break;
            case "View Roles":
                viewRoles()
                break;
            case "View Employees":
                viewEmployees()
                break;
            case "Upade Employee Roles":
                updateEmployee()
                break;

            default:
                connection.end();
                break;
        }
    })
}

function viewRoles(){
    var query = "SELECT * FROM roles ";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    })
      }


function viewEmployees(){
    var query = "SELECT * FROM employees";
    connection.query(query,function(err,res){
        if(err) throw err;
        console.table(res);
    })
}

function viewDepart(){
    var query = "SELECT * FROM departments";
    connection.query(query,function(err,res){
        if(err) throw err;
        console.table(res);
    })
}

function addRole(){
    inquirer.prompt([
        {
        type:"input",
        name: "roleTitle",
        message:"what role would you like to add"
        },
        {
            type:"input",
            name:"salary",
            message:"what is the department role",

        },
        {
            type:"input",
            name:"departmentId",
            message:"what the department id"
        }

    ]).then(answers =>{
        connection.query(
            "INSERT INTO roles Set ?",
            {
                title:answers.roleTitle,
                salary:answers.salary,
                department_id: answers.departmentId
            }, function(err,res){
                if(err) throw err;
                promptUser();
            }
        )

    })
}
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "Employee Name",
            message: "Please enter your first name"
        },
        {
            type: "input",
            name: "Last Name",
            message: "Please enter your last name",

        },
        {
            type: "input",
            name: "id",
            message: "Please enter ID"
        }

    ]).then(answers => {
        connection.query(
            "INSERT INTO employees Set ?",
            {
                first_name: answers.first_name,
                last_name: answers.last_name,
                id: answers.id
            }, function (err, res) {
                if (err) throw err;
                promptUser();
            }
        )

    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "Department Name",
            message: "What department would you like to add?"
        },
        {
            type: "input",
            name: "departmentId",
            message: "Please enter department id"
        }

    ]).then(answers => {
        connection.query(
            "INSERT INTO departments Set ?",
            {
                name: answers.name,
                id: answers.id
            }, function (err, res) {
                if (err) throw err;
                promptUser();
            }
        )

    })
}
