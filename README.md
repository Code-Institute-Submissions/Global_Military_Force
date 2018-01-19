# Global Militry Firepower

This is a Data Visualisation website developped as the Stream 2 project of The Code Institute's classroom bootcamp. It has interactive charts displaying information on the world's top 10 military powers for comparison and educational purposes.


## Live Demo

Here is the link for the Heroku-deployed website https://global-military-firepower.herokuapp.com/


## Components

### Flask

A Python micro-framework that was used to serve the data and render the HTML pages for this Application.


### MongoDB database

This is a NoSQL database that converts and .csv data into .JSON and allows it to be accessed. 

### Crossfilter.js

This is a Javascript based data manipulation library for exploring large multivariate datasets in the browser. It links the charts on this website that use the same crossfilter, making them all filter simultaneously as Users interact with the charts.


### D3.js

This is the software that renders the graphs into the html page within an svg element.


### Dc.js

This Javascript software allows manipulation of the charts and their properties.


## Prerequisites

Here is the list of software required to build this website:

Flask==0.12.2

Jinja2==2.10

MarkupSafe==1.0

Werkzeug==0.14.1

click==6.7

gunicorn==19.7.1

itsdangerous==0.24

psycopg2==2.7.3.2

pymongo==3.6.0


## Deployment

This project was deployed via Heroku, and pretested using Travis CI


## Database

mLab was used to host the Mongo Database.


## Built With

Flask

HTML

CSS

Bootstrap

Python

MongoDB database

d3.js, dc.js, crossfilter.js and queue.js

Data in a .csv file that I manually made using data from GlobalFirepower.com


## Versioning

The code was written on Cloud9 and version-controlled using github https://github.com/CrisperDarkling/Global_Military_Force


## Project Management

I used the Asana website and app to manage my project tasks from beginning to end. I had multiple column headings under which I could easily create, alter and move tasks around.


My complete tasks:

![AsanaComp](https://s3-eu-west-1.amazonaws.com/jordan-peterson-bookstore/static/images/Asana_GMF_comp.png "Asana Complete Tasks")


My incomplete tasks:

![AsanaIncomp](https://s3-eu-west-1.amazonaws.com/jordan-peterson-bookstore/static/images/Asana_GMF_incomp.png "Asana Incomplete Tasks")


## Acknowledgments

I must acknowledge:

- Richard Dalton & Matt Rudge (Lecturers) and Katie Maxwell & Neil McEwen (Teaching Assitants) for all their teaching, support and coding wisdom throughout this coding course.
- My class mates for their high-spirits, help and hard work.
- Dr. Jordan Peterson for being an awesome inspiration.







<!--```-->
<!--Give examples-->
<!--```-->

<!--### Installing-->

<!--A step by step series of examples that tell you have to get a development env running-->

<!--Say what the step will be-->

<!--```-->
<!--Give the example-->
<!--```-->

<!--And repeat-->

<!--```-->
<!--until finished-->
<!--```-->

<!--End with an example of getting some data out of the system or using it for a little demo-->

<!--## Running the tests-->

<!--Explain how to run the automated tests for this system-->

<!--### Break down into end to end tests-->

<!--Explain what these tests test and why-->

<!--```-->
<!--Give an example-->
<!--```-->

<!--### And coding style tests-->

<!--Explain what these tests test and why-->

<!--```-->
<!--Give an example-->
<!--```-->
