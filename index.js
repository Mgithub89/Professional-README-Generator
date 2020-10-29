const inquirer = require("inquirer");
const fs = require("fs");

const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);


const promptUser = () =>
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your project name?",
                name: "name"
            },
            {
                type: "confirm",
                message: "Do you have a github repo for this project?",
                name: "githubrepo"
            },
            {
                type: "input",
                message: "pls provide github repo url of your project",
                name: "url",
                when: function (answers) {
                    return answers.githubrepo
                }
            },
            {
                type: "checkbox",
                message: "what is your table of content includes ?",
                name: "tablecontent",
                choices: [
                    "About-the-project ",
                    "Objective",
                    "How-to-use-the-app",
                    "Technology-used",
                    "License",
                    "Contact"
                ]
            },
            {
                type: "editor",
                message: "please tell user about the project?",
                name: "About"
            },
            {
                type: 'editor',
                name: 'Objective',
                message: 'What is the objective of the project?',
            },
            {
                type: 'editor',
                name: 'Howtouse',
                message: 'please tell user how to use the app',
            },
            {
                type: 'checkbox',
                name: 'Technology',
                message: 'what technology you used to build the app?',
                choices: [
                    'inquirer',
                    'fs(filesystem)',
                    'node',
                    'JavaScript'
                ]
            },
            {
                type: 'checkbox',
                name: 'License',
                message: 'what license you used ?',
                choices: [
                    "MIT",
                    "Apache",
                    "ISC"
                ]

            },
            {
                type: "input",
                message: "please provide yor email ?",
                name: "email"
            },
        ])


const generateREADME = (answers) =>
    `
 # ${answers.name}

 Explore the [project-page](${answers.url})

### Table of contents
 - [About-The-Project](#About-The-Project)
 - [Objective](#Objective)
 - [How-to-use-the-app](#How-to-use-the-app)
 - [Technologies-used](#Technologies-used)
 - [License](#License)
 - [Contact](#Contact)

 ## About The Project
* ${answers.About}
## Objective
* ${answers.Objective}
## How to use the app
* ${answers.Howtouse}
## Technologies used
* ${answers.Technology[0]}
* ${answers.Technology[1]}
* ${answers.Technology[2]}
 ## License 
 ![License](https://img.shields.io/badge/License-${answers.License}-blue.svg "License Badge")
 For more information about the License , click on the likk below.
 * [License](https://opensource.org/licenses/${answers.License})
## Contact

* [${answers.email}](mailto:${answers.email})

        `
promptUser()
    .then((answers) => {
        writeFileAsync('README.md', generateREADME(answers))
        console.log(answers)
        //    console.log(answers.table)
        //    console.log(answers.table.Introduction) 
    })
    .then(() => {
        console.log('Successfully wrote to README.md')
    })
    .catch((err) => console.error(err));