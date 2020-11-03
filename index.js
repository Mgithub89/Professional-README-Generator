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
                type: "editor",
                message: "pls provide installation instruction about the project?",
                name: "installation"
            },
            {
                type: 'editor',
                name: 'Howtouse',
                message: 'please tell user how to use the app',
            },
            {
                type: "editor",
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
                    "ISC"
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
                name: "email"
            },
        ])


const generateREADME = (answers) =>
    `
# ${answers.title}
![License](https://img.shields.io/badge/License-${answers.License}-green.svg "License Badge")
 
Explore the [project-page](${answers.url})

### Description
${answers.description}


 ## Table Of Contents 
* [Installation Instructions](#Installation-Instructions)
* [How To Use The App](#How-to-use-the-app)
* [Technologies Used](#Technologies-Used)
* [Contributing Guidelines](#Contributing-Guidelines)
* [Test Information](#Test-Information)
* [License](#License)
* [Questions](#Questions)

 ## Installation Instructions
* ${answers.installation}
## How to use the app
* ${answers.Howtouse}
## Technologies used
* ${answers.Technology[0]}
* ${answers.Technology[1]}
* ${answers.Technology[2]}
## Contributing Guidelines
${answers.contribution}
## Test Information
${answers.test}
 ## License 
 ![License](https://img.shields.io/badge/License-${answers.License}-blue.svg "License Badge")
 For more information about the License , click on the link below.
 * [License](https://opensource.org/licenses/${answers.License})
## Questions

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