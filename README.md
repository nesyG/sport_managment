# Sports Management app

## `Description`
Goal of this project is to make a full-stack web app that is used for managing a sports centre and it's registered users.

Client-side:
- Typescript
- React

Server-side:
- MongoDB
- RESTful API (Express)
- Typescript
- Node
- Passport JWT

## `Docker`

<b>Build image</b>
- docker build . -t node-web-app

<b>List images</b>
- docker images

<b>Run container</b>
- docker run -p 49160:3500 -d node-web-app

<b>List containers</b>
- docker ps

<b>Stop container</b>
- docker stop "CONTAINER ID"

## `Postman`

### `Example request`
- http://localhost:49160/mainPage/classes?sports=Football,Basketball&ageGroups=children,youth


## `Swagger`

http://localhost:49160/docs/
