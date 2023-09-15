INSERT INTO department (department_name)
VALUES ("Financial"),
       ("Office"),
       ("Editorial");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 4000 , 1),
       ("Secretary" , 2500, 2),
       ("Editor Lead", 4500 , 3);
       

INSERT INTO employee (first_name,last_name, role_id, manager_id)
VALUES ("Sarah","Jason", 1 , NULL),
       ("Steven" ,"Jack", 2, 1),
       ("Rose", "Rock",  3 , 1);