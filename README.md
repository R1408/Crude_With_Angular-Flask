# Crude operation using angular and flask


## Prerequisites

##### What things you need to install this project and how to setup the project on local


1. Node [![Node Version](https://img.shields.io/badge/Version-12.16.1*-green)](https://nodejs.org/en/)
2. Angular [![Angular Version](https://img.shields.io/badge/Version-9.0.2*-green)](https://angular.io/guide/setup-local#npm-package-manager)
3. Python [![Python Version](https://img.shields.io/badge/Version-3.7.6-green)](https://www.python.org/downloads/)
4. Flask [![Flask Version](https://img.shields.io/badge/Version-1.1.2-green)](https://pypi.org/project/Flask/)

## Installation

1. Clone project using below command
```
$ git clone https://github.com/R1408/Crude_With_Angular-Flask.git
```
2. Go to project directory
```
$ cd Crude_With_Angular-Flask
```
3. There are two directory Angular and Flask
4. First open the angular project
```
$ cd Angular
```
5. Go inside the crude directory. crude is a angular project name
```
$ cd crude
```
6. Now open the command prompt here and write the command ng serve for start the angular service
```
$ ng serve
```
7. Go to the flask directory of Crude_With_Angular-Flask directory then open command prompt and write below command for start the flask
   project
```
$ python app.py
```
8. Open _init_.py of python directory and change the configuration according to your database. here i am used phpMyAdmin
9. create database crude
```
$ create database crude
```
10. Flaks project have a migration file, open the command prompt
11. To add migration support to your database you just need to run the init command:
```
$ python migration.py db init
```
12. To issue your first migration you can run the following command:
```
$ python migration.py db migrate
```
13. The next step is to apply the migration to the database. For this you use the upgrade command:
```
$ python migration.py db upgrade
```
14. All necessary tables of crude database will create.
15. Now you can do crude operation with angular and flask

## Contributor

**Developer**

  1. Raj Patel

