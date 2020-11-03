const inquirer = require("inquirer");
const fs = require("fs");

const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);


const promptUser = () =>
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your project title?",
                name: "title"
            },

            {
                type: "input",
                message: "pls provide github repo url of your project",
                name: "url",

            },

            {
                type: "editor",
                message: "please provide a breif description about the project?",
                name: "description"
            },

            {
                type: "input",
                message: "pls provide installation instruction about the project?",
                name: "installation"
            },
            {
                type: 'editor',
                name: 'Howtouse',
                message: 'please tell user how to use the app',
            },
            {
                type: "input",
                message: "pls provide contribution guidlines for this project?",
                name: "contribution"
            },
            {
                type: "input",
                message: "pls provide test instructions for this project?",
                name: "test"
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
                type: 'list',
                name: 'License',
                message: 'what license you used ?',
                choices: [
                    "MIT",
                    "Apache",
                    "ISC",
                    "None"
                ]

            },
            {
                type: "input",
                message: "What is your github username?",
                name: "username"
            },
            {
                type: "input",
                message: "please provide yor email ?",
                name: "email",
                validate: function validateEmail(email) {
                    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                }
            },
        ])


const generateREADME = (answers) =>
    `
# ${answers.title}

![License](https://img.shields.io/badge/License-${answers.License}-green.svg "License Badge")
 
Explore the [project-page](${answers.url})

## Description
${answers.description}

## Table Of Contents 
* [Installation](#Installation)
* [Usage](#Usage)
* [Technologies Used](#Technologies-Used)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [License](#License)
* [Questions](#Questions)

## Installation
* ${answers.installation}

## usage
* ${answers.Howtouse}

## Technologies used
* ${answers.Technology[0]}
* ${answers.Technology[1]}
* ${answers.Technology[2]}

## Contributing
* ${answers.contribution}

## Tests
* ${answers.test}

## License 
 ![License](https://img.shields.io/badge/License-${answers.License}-green.svg "License Badge")
 For more information about the License , click on the link below.
 * [License](https://opensource.org/licenses/${answers.License})

## Questions
* visit my [github profile](https://github.com/${answers.username})
* for Questions you can reach me at [${answers.email}](mailto:${answers.email})

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