// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Limonconsal03',
    database: 'department_db'
});

// simple query
// connection.query(
//   'select * from department',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(err);
//   }
// );


// //A set of questions that the user needs to answer in the terminal

function options() {

    inquirer
        .prompt([
            {
                type: 'list',
                name: "pick",
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', "Quit"],
            },
        ])

        .then((data) => {

            if (data.pick == 'View all departments') {
                connection.query(
                    'select * from department;',
                    function (err, results, fields) {
                        console.table(results); // results contains rows returned by server
                        console.log(err);
                        options();
                    });
            }
            else if (data.pick == "View all roles") {
                connection.query(
                    'select * from role;',
                    function (err, results, fields) {
                        console.table(results); // results contains rows returned by server
                        console.log(err);
                        options();
                    });
            }
            else if (data.pick == "View all employees") {
                connection.query(
                    'select * from employee;',
                    function (err, results, fields) {
                        console.table(results); // results contains rows returned by server
                        console.log(err);
                        options();
                    });
            }
            else if (data.pick == "Add a department") {

                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: "department",
                            message: 'What is the department name?',
                        },
                    ])

                    .then((data) => {
                        const department = data.department;

                        connection.query(
                            'insert into department (department_name) values (' + '"' + department + '"' + ');',
                            function (err, results) {
                                err ? console.log(err) : console.log('Added Department Success!')
                                options();
                            });
                    });

            }
            else if (data.pick == "Add a role") {

                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: "title",
                            message: 'What is the title?',
                        },
                        {
                            type: 'input',
                            name: "salary",
                            message: 'What is the salary?',
                        },
                        {
                            type: 'input',
                            name: "department_id",
                            message: 'What is the department for the role? (type a number)',
                        },
                    ])

                    .then((data) => {
                        const title = data.title;
                        const salary = data.salary;
                        const department_id = data.department_id;

                        connection.query(
                            'insert into role (title,salary,department_id) values (' + '"' + title + '"' + ',' + '"' + salary + '"' + ',' + department_id +');',
                            function (err, results) {
                                err ? console.log(err) : console.log('Added a Role Success!')
                                options();
                            });
                    });

            }
            else if (data.pick == "Add an employee") {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: "first_name",
                            message: 'What is the first name?',
                        },
                        {
                            type: 'input',
                            name: "last_name",
                            message: 'What is the last name?',
                        },
                        {
                            type: 'input',
                            name: "role_id",
                            message: 'What is the employee role? (type a number)',
                        },
                        {
                            type: 'input',
                            name: "manager_id",
                            message: 'What is the manager role? (type a number or NULL if they are manager)',
                        },
                    ])

                    .then((data) => {
                        const first_name = data.first_name;
                        const last_name = data.last_name;
                        const role_id = data.role_id;
                        const manager_id = data.manager_id;

                        connection.query(
                            'insert into employee (first_name,last_name,role_id,manager_id) values (' + '"' + first_name + '"' + ',' + '"' + last_name + '"' + ',' + role_id + ',' + manager_id + ');',
                            function (err, results) {
                                err ? console.log(err) : console.log('Added an Employee Success!')
                                options();
                            });


                    });
            }
            else if (data.pick == "Update an employee role") {

                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: "number1",
                            message: 'What is the employee role you wish to update it to? (type a number)',
                        },
                        {
                            type: 'input',
                            name: "number2",
                            message: 'What is the employee role you wish to change? (type a number)',
                        },
                    ])

                    .then((data) => {
                        const number1 = data.title;
                        const number2 = data.salary;
                        connection.query(
                            'update employee set role_id =' + number1 + ' where id=' + number2 + ';',
                            function (err, results) {
                                err ? console.log(err) : console.log('Updated Employee Success!')
                                options();
                            });
                    });

            }
            else {
                console.log("Bye");
                process.exit();
            }

        });
}

options();