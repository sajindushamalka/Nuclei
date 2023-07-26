01. Create nodeJs backend project 
02. Install the express mongoose dotenv cors body-parser nodemon jsonwebtoken to the project.
03. Create server.js and configure the port and Mongodb connection.
03. Configure type="module" , and backend run command in package.json file. 
04. Create user model with (emp_id,emp_name,emp_password,emp_type)
05. Create user controller class with (user register, user sign, user sign out, get all users, get one user, update user, delete user).
06. Create routers for this controller.
07. Create a leave model with (emp_id,emp_leaves_count,emp_leaves_type,emp_leaves_status).
08. Create a Leave management controller with (Request Leaves, view leave balances, track leaves, and update leave status) methods.
09. Create a router for this leave management controller.
10. Create a leave policy model with (leave_id,leaves_type,Leaves_per_year,leave_eligibility_criteria).
09. Create leave policy controller class within (add leave policy, display policy, update leave policy, delete policy) methods.
10. Create a router for this controller class.
11. Create an average leave method, for each employee's available leaves method and no of leaves each employee gets method to generate a report in the leaves controller class.
12. Create a total no of leaves method in the leave policy controller class for the report. 
13. Call all the routes in the server.js and check the back end using Postman.