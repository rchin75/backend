# Backend #

This is a generic REST backend that supports CRUD operations on relational database tables.
It also provides basic user authentication.

## Disclaimers ##

This is my hobby project, and it is work in progress.

Use at your own risk. This project comes without any warranties whatsoever.

## Running ##
npm run server


# TODO #

- bcryptjs password fields - DONE
- remove password field from user before sending to client - DONE
- in crud.js hash passwords in POST and PUT operations. - DONE
- add rolling file logger
- add support for .env
- implement a task model for kanban boards