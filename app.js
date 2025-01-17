"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var mysql = require("mysql2");
var inquirer_1 = require("inquirer");
var Database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
Database.connect(function (err) {
    if (err) {
        console.error("Connection error", err);
    }
    else {
        console.log("Connected to database");
    }
});
var viewComapnies = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        Database.query("Select * from companies", function (err, results) {
            if (err) {
                console.error(err);
            }
            else {
                console.table(results);
                CRM();
            }
        });
        return [2 /*return*/];
    });
}); };
var addCompany = function () { return __awaiter(void 0, void 0, void 0, function () {
    var company_name;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                    {
                        type: "input",
                        name: "company_name",
                        message: "Enter Company Name: ",
                    },
                ])];
            case 1:
                company_name = (_a.sent()).company_name;
                Database.query("INSERT INTO companies (company_name) VALUES (?)", [company_name], function (err, results) {
                    if (err) {
                        console.error(err);
                        CRM();
                    }
                    else {
                        console.log("Company Added");
                        CRM();
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
var updateCompany = function () { return __awaiter(void 0, void 0, void 0, function () {
    var company_name, New_Name;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                    {
                        type: "number",
                        name: "company_name",
                        message: "What is the ID of the company who's name you wish to change?",
                    },
                ])];
            case 1:
                company_name = (_a.sent()).company_name;
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: "input",
                            name: "New_Name",
                            message: "What is the companies new name",
                        },
                    ])];
            case 2:
                New_Name = (_a.sent()).New_Name;
                Database.query("UPDATE companies SET company_name = ? Where company_id = ?", [New_Name, company_name], function (err, results) {
                    if (err) {
                        console.log("Error updating company", err);
                    }
                    else if (results.affectedRows > 0) {
                        console.log("Successful Update");
                    }
                    else {
                        console.log("No changes made, check the company id");
                    }
                    CRM();
                });
                return [2 /*return*/];
        }
    });
}); };
var deleteCompany = function () { return __awaiter(void 0, void 0, void 0, function () {
    var company_id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                    {
                        type: "number",
                        name: "company_id",
                        message: "What is the id of the company you wish to delete",
                    },
                ])];
            case 1:
                company_id = (_a.sent()).company_id;
                Database.query("DELETE FROM companies WHERE company_id = ?", [company_id]);
                console.log("Company with ID ".concat(company_id, " has been deleted"));
                CRM();
                return [2 /*return*/];
        }
    });
}); };
var CRM = function () { return __awaiter(void 0, void 0, void 0, function () {
    var input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
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
                ])];
            case 1:
                input = (_a.sent()).input;
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
                    case "9: Exit":
                        Database.end();
                        process.exit();
                }
                return [2 /*return*/];
        }
    });
}); };
CRM();
