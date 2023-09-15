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
    password: '', //add sql password to make the code work
    database: 'department_db'
});


function options() {
//A set of questions that the user needs to answer in the terminal
    inquirer
        .prompt([
            {
                type: 'list',
                name: "pick",
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', "Quit"],
            },
        ])

        //obtain the data from the prompt
        .then((data) => {

            //statement for if the user views the departments table
            if (data.pick == 'View all departments') {
                connection.query(
                    'select * from department;',
                    function (err, results, fields) {
                        console.table(results); // Displays the final result
                        console.log(err);
                        options();//calls back to the top, repeats the prompt
                    });
            }
            //statement for if the user views the roles table
            else if (data.pick == "View all roles") {
                connection.query(
                    'select * from role;',
                    function (err, results, fields) {
                        console.table(results); // Displays the final result
                        console.log(err);
                        options();//calls back to the top, repeats the prompt
                    });
            }
            //statement for if the user views the employees table
            else if (data.pick == "View all employees") {
                connection.query(
                    'select * from employee;',
                    function (err, results, fields) {
                        console.table(results); // Displays the final result
                        console.log(err);
                        options();//calls back to the top, repeats the prompt
                    });
            }
            //statement for if the user wants to add a department to the department table
            else if (data.pick == "Add a department") {
                //prompt to obtain more data
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
                                err ? console.log(err) : console.log('Added Department Success!') // Displays a comment
                                options();//calls back to the top, repeats the prompt
                            });
                    });

            }
            //statement for if the user wants to add a role to the role table
            else if (data.pick == "Add a role") {
                //prompt to obtain more data
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
                                err ? console.log(err) : console.log('Added a Role Success!')// Displays a comment
                                options();//calls back to the top, repeats the prompt
                            });
                    });

            }
            //statement for if the user wants to add an employee to the employees table
            else if (data.pick == "Add an employee") {
                //prompt to obtain more data
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
                                err ? console.log(err) : console.log('Added an Employee Success!')// Displays a comment
                                options();//calls back to the top, repeats the prompt
                            });


                    });
            }
            //statement for if the user wants to update an employee's role to the employees table
            else if (data.pick == "Update an employee role") {
                //prompt to obtain more data
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: "second",
                            message: 'What is the employee id (position) you want to change? (type a number)',
                        },
                        {
                            type: 'input',
                            name: "first",
                            message: 'What is the new employee role you wish to update it to? (type a number)',
                        },
                        
                    ])

                    .then((data) => {
                        const first = data.first;
                        const second = data.second;
                        connection.query(
                            'update employee set role_id =' + first + ' where id=' + second + ';',
                            function (err, results) {
                                err ? console.log(err) : console.log('Updated Employee Success!')// Displays a comment
                                options(); //calls back to the top, repeats the prompt
                            });
                    });

            }
            //statement if the user decides to end the prompt and finish execution
            else {
                console.log("Bye");
                process.exit();
            }

        });
}

options();