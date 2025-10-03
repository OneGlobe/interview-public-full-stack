# Interview Full-Stack

Full-stack movie application with Spring Boot backend and React frontend. This repository is used for OneGlobe's technical interview challenges.

## Interview

For interview-specific instructions, please see:
- [Software Engineer Interview](SDE_INTERVIEW.md)

## Quick Start

### Backend (Spring Boot)
```bash
cd interview-spring
docker-compose up
```
Backend will be available at http://localhost:8081/swagger-ui/index.html

### Frontend (React)
Choose either JavaScript or TypeScript:
```bash
# JavaScript version:
cd js-react-app
npm install
npm start

# OR TypeScript version:
cd ts-react-app
npm install
npm start
```
Frontend will be available at http://localhost:3000

### Test Accounts

The local environment is seeded with test user accounts:
- Usernames: `reviewer1`, `reviewer2`, `reviewer3`
- Password: `password` (for all accounts)

## Structure

```
interview-full-stack/
├── interview-spring/     # Spring Boot backend with RESTful API
├── js-react-app/        # React frontend (JavaScript)
├── ts-react-app/        # React frontend (TypeScript)
└── SDE_INTERVIEW.md     # Interview instructions
```

Each folder has its own README with detailed instructions on how to install dependencies, install the runtimes/compilers, and run it locally.