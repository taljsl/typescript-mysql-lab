import * as dotenv from "dotenv";
dotenv.config();
import * as mysql from "mysql2";
import inquirer from "inquirer";

const Database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

Database.connect((err) => {
  if (err) {
    console.error("Connection error", err);
  } else {
    console.log("Connected to database");
  }
});

const viewComapnies = async (): Promise<void> => {
  Database.query("Select * from companies", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
      CRM();
    }
  });
};

const addCompany = async (): Promise<void> => {
  const { company_name }: { company_name: string } = await inquirer.prompt([
    {
      type: "input",
      name: "company_name",
      message: "Enter Company Name: ",
    },
  ]);
  Database.query(
    "INSERT INTO companies (company_name) VALUES (?)",
    [company_name],
    (err, results) => {
      if (err) {
        console.error(err);
        CRM();
      } else {
        console.log("Company Added");
        CRM();
      }
    }
  );
};
type response = {
  name: String;
};
const updateCompany = async (): Promise<void> => {
  const { company_name } = await inquirer.prompt([
    {
      type: "number",
      name: "company_name",
      message: "What is the ID of the company who's name you wish to change?",
    },
  ]);
  const { New_Name } = await inquirer.prompt([
    {
      type: "input",
      name: "New_Name",
      message: "What is the companies new name",
    },
  ]);
  Database.query(
    "UPDATE companies SET company_name = ? Where company_id = ?",
    [New_Name, company_name],
    (err, results: mysql.OkPacket) => {
      if (err) {
        console.log("Error updating company", err);
      } else if (results.affectedRows > 0) {
        console.log("Successful Update");
      } else {
        console.log("No changes made, check the company id");
      }
      CRM();
    }
  );
};

const deleteCompany = async (): Promise<void> => {
  const { company_id } = await inquirer.prompt([
    {
      type: "number",
      name: "company_id",
      message: "What is the id of the company you wish to delete",
    },
  ]);
  Database.query("DELETE FROM companies WHERE company_id = ?", [company_id]);
  console.log(`Company with ID ${company_id} has been deleted`);
  CRM();
};

const viewEmployees = async (): Promise<void> => {
  Database.query("Select * from employees", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
      CRM();
    }
  });
};

const addEmployee = async (): Promise<void> => {
  const { first_name, last_name, employer_id } = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter Employee First Name: ",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter Employee Last Name: ",
    },
    {
      type: "number",
      name: "employer_id",
      message: "Enter Employer ID: ",
    },
  ]);
  Database.query(
    "INSERT INTO employees (first_name, last_name, employer_id) VALUES (?, ?, ?)",
    [first_name, last_name, employer_id],
    (err, results) => {
      if (err) {
        console.error(err);
        CRM();
      } else {
        console.log("Employee Added");
        CRM();
      }
    }
  );
};

const updateEmployee = async (): Promise<void> => {
  const { employee_id } = await inquirer.prompt([
    {
      type: "number",
      name: "employee_id",
      message: "What is the ID of the employee who's name you wish to change?",
    },
  ]);
  const { New_First_Name } = await inquirer.prompt([
    {
      type: "input",
      name: "New_First_Name",
      message: "What is the employees new first name",
    },
  ]);
  const { New_Last_Name } = await inquirer.prompt([
    {
      type: "input",
      name: "New_Last_Name",
      message: "What is the employees new last name",
    },
  ]);
  const { New_Employer_ID } = await inquirer.prompt([
    {
      type: "number",
      name: "New_Employer_ID",
      message: "What is the employees new employer ID",
    },
  ]);
  Database.query(
    "UPDATE employees SET first_name = ?, last_name = ?, employer_id = ? Where id = ?",
    [New_First_Name, New_Last_Name, New_Employer_ID, employee_id],
    (err, results: mysql.OkPacket) => {
      if (err) {
        console.log("Error updating employee", err);
      } else if (results.affectedRows > 0) {
        console.log("Successful Update");
      } else {
        console.log("No changes made, check the employee id");
      }
      CRM();
    }
  );
};

const deleteEmployee = async (): Promise<void> => {
    const { id } = await inquirer.prompt([
        {
        type: "number",
        name: "id",
        message: "What is the id of the employee you wish to delete",
        },
    ]);
    Database.query("DELETE FROM employees WHERE id = ?", [id]);
    console.log(`Employee with ID ${id} has been deleted`);
    CRM();
    }
const CRM = async () => {
  const { input } = await inquirer.prompt([
    {
      type: "list",
      name: "input",
      message: "What would you like to do?",
      choices: [
        "1: View Companies",
        "2: Add Company",
        "3: Update Company",
        "4: Delete Company",
        "5: View Employees",
        "6: Add Employee",
        "7: Update Employee",
        "8: Delete Employee",
        "9: Exit",
      ],
    },
  ]);
  switch (input) {
    case "1: View Companies":
      viewComapnies();
      break;
    case "2: Add Company":
      addCompany();
      break;
    case "3: Update Company":
      updateCompany();
      break;
    case "4: Delete Company":
      deleteCompany();
      break;
    case "5: View Employees":
      viewEmployees();
      break;
    case "6: Add Employee":
      addEmployee();
      break;
    case "7: Update Employee":
      updateEmployee();
      break;
    case "8: Delete Employee":
      deleteEmployee();
      break;

    case "9: Exit":
      Database.end();
      process.exit();
  }
};
CRM();
