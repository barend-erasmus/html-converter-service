# html-converter-service

[![Build Status](http://jenkins.developersworkspace.co.za:8080/job/html-converter-service-nightly/badge/icon)](http://jenkins.developersworkspace.co.za:8080/job/html-converter-service-nightly/)

## Getting Started

Clone the repository

`git clone https://github.com/barend-erasmus/html-converter-service.git`

Change to cloned directory

`cd ./html-converter-service`

Install node packages

`npm install`

Start project

`npm start`

Browse `http://localhost:3000/api`

## Docker Setup 

`docker build --no-cache -t html-converter-service ./`

`docker run -d -p 8080:3000 --name html-converter-service -v /logs:/logs -v /opt/html-converter-service:/opt/html-converter-service -t html-converter-service`