const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer"); // pass in info as an argument to the render functions after getting all data 

const teamName = [{
    type: "input",
    name: "teamName",
    message: "What's the name of your team"
}]

const memberTypePrompt = [{
    type: "list",
    message: "Team Member Type",
    name: "memberType",
    choices: [
        "Intern",
        "Manager",
        "Engineer"
    ]
}]

const employeePrompt = [{
    type: "input",
    name: "name",
    message: "What's the name of team member?"
}, {
    type: "input",
    name: "id",
    message: "What's the ID of team member?"
}, {
    type: "input",
    name: "email",
    message: "What's the email of the team member?"
}]

const team = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const main = async () => {
    //write code to use inquirer to gather information about the development 

    await ask();

    const htmlBlock = await render(team);

    fs.writeFile(outPath, htmlBlock, function (err) {
        if (err) {
            return console.log("It failed to write to the file ")
        }
    })
}

const ask = async (q) => {

    var key = await inquirer.prompt(memberTypePrompt);
    var done = "Yes";
    switch (key.memberType) {
        case "Manager":
            var toPush = [{
                type: "input",
                name: "officeNumber",
                message: "What's the office number"
            }, {
                type: "list",
                message: "Are you finished entering team members?",
                name: "done",
                choices: [
                    "Yes",
                    "No"
                ]
            }]
            var a = employeePrompt.concat(toPush);
            var answ = await inquirer.prompt(a);
            done = answ.done;
            buildManager(answ);
            break;
        case "Engineer":
            var toPush = [{
                type: "input",
                name: "github",
                message: "What's the github user name of the engineer?"
            }, {
                type: "list",
                message: "Are you finished entering team members?",
                name: "done",
                choices: [
                    "Yes",
                    "No"
                ]

            }]
            var a = employeePrompt.concat(toPush);
            var answ = await inquirer.prompt(a);
            done = answ.done;
            buildEngineer(answ);
            break;
        case "Intern":
            var toPush = [{
                type: "input",
                name: "school",
                message: "What's the school of the intern?"
            }, {
                type: "list",
                message: "Are you finished entering team members?",
                name: "done",
                choices: [
                    "Yes",
                    "No"
                ]
            }]
            var a = employeePrompt.concat(toPush);
            var answ = await inquirer.prompt(a);
            done = answ.done;
            buildIntern(answ);
            break

        default:
            break;
    }
    if (done === "No") {
        await ask()
    }

    return;
}

const buildEngineer = (m) => {
    const person = new Engineer(m.name, m.id, m.email, m.github);
    team.push(person);
}
const buildManager = (m) => {
    const person = new Manager(m.name, m.id, m.email, m.officeNumber);
    team.push(person);
}
const buildIntern = (m) => {
    const person = new Intern(m.name, m.id, m.email, m.school)
}

main();