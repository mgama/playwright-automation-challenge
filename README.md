# Playwright Automation Challenge

Sample test automation project that covers e2e testing for a Project Management app

## Description

This project showcases a prototype of the playwright test automation framework to test out simple smoke and regression e2e tests for a Project Management app

## Getting Started

### Dependencies

* nodejs
* playwright

### Installing

- npm install
- npx playwright install

### Executing tests locally

Create an .env file with the following variables provided for the challenge:
```
 # .env
USER_NAME=
PASSWORD=
BASEURL=
```

These variables have already been configured on this github repo to execute the tests via the playwright github workflow

* To run all the tests in headless mode:
```
npx playwright test
```

* To run the tests using the UI mode of Playwright 
```
npx playwright test --ui
```

### Running tests in Github CI 
There is an existing github workflow (.github/workflows/playwright.yml) that will execute all the existing tests for every push to the main/master branch of the repository. 
You can view the runs of the workflow on this link: https://github.com/mgama/playwright-automation-challenge/actions

## Authors

Manuel A. Gama
mgamamsc@gmail.com
