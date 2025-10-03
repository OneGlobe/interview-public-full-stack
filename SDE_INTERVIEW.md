# Software Engineer Interview

## Agenda for the interview
1. Overview of the company and role, discussion of candidate experience (10 minutes) 
2. Live coding scenario (45 minutes): 
- We will provide you with a specific scenario that you will need to implement using the codebase you have set up. At a high level, this scenario will involve performing full-stack software development to enhance our simple Movie application with a user ratings feature. Feel free to commit changes to your repository to get familiar with the applications, however do not attempt to implement a user ratings feature as specific instruction will be given during the interview. 
- This will require both frontend (be prepared to choose Javascript or Typescript) and backend (Java) development skills.  
- Using AI: Please do not use any AI code generation or chat tools during our live session. Most of our customers do not allow these technologies yet, and we are aiming to reflect a realistic day-to-day scenario during this interview. Please only work on the shared screen. 
3. Debrief/feedback (5 minutes) 

## Interview Guidelines

- :white_check_mark: Google / Internet Search
- :white_check_mark: AI questions w/o copy-paste (eg. Claude, ChatGPT, Perplexity)
- :x: AI coding agents, AI autocomplete (eg. Copilot, Cursor, Claude Code)
- :x: Changes made prior to the interview will not be accepted

## Preparation

- [ ] Clone this repository to your local machine
- [ ] Choose either JavaScript or TypeScript for the frontend (js-react-app OR ts-react-app)
- [ ] Successfully run the application stack (see Quick Start in respective READMEs)
- [ ] Verify you can access both the frontend and backend
- [ ] Review the codebase structure and familiarize yourself with the key components

## Quick Start

### Backend (Spring Boot)
```bash
cd interview-spring
docker-compose up
```
Backend will be available at http://localhost:8081/swagger-ui/index.html

### Frontend (React)
```bash
# Choose one:
cd js-react-app  # OR cd ts-react-app
npm install
npm start
```
Frontend will be available at http://localhost:3000

### Test Accounts

The local environment is seeded with test user accounts:
- Usernames: `reviewer1`, `reviewer2`, `reviewer3`
- Password: `password` (for all accounts)

## Tasks

You will complete the following tasks to demonstrate your full-stack development skills:

### Scenario: User Movie Reviews

Today our application allows users to create, search, and view movies, but it's come time to expand our feature set and product stickiness with new features. Since no movie website would be complete without reviews, let's build support for user submitted reviews.

### 1. Add Movie Ratings Feature (Backend)

Implement a rating system for movies:
- Movies can have many Ratings
- A logged in User should be able to:
  - Add a rating on a scale of 1 to 5 stars
  - Include an optional review comment (maximum 250 characters)
- A Movie can be reviewed only once per User
- A User can update their existing Review

**Backend Requirements:**
- Create appropriate database models/entities for ratings
- Implement RESTful API endpoints for creating and updating ratings
- Ensure proper validation (1-5 star range, character limits, unique user-movie constraint)
- Enforce authentication - only logged in users can submit ratings

### 2. Display Movie Ratings (Frontend)

Update the movie listing view to display ratings:
- Display a list of user ratings as stars (★) with comments when provided
- Show an average rating for each movie
- Ensure a good user experience for both viewing and submitting ratings

**Frontend Requirements:**
- Create UI components for displaying ratings
- Implement star rating visualization
- Calculate and display average ratings
- Add functionality for users to submit and update their own ratings

## Requirements

- All changes must work with the existing application architecture
- Follow RESTful API design principles
- Implement proper error handling and validation
- Be prepared to implement and run your solution
- Demonstrate that both features work correctly


## Evaluation
We want to be transparent with how we will be evaluating your execution of the coding scenario. The following breakdown has been provided for your reference. 

### Backend 

#### Spring Practices 
- Creates service logic, controllers, and repositories with Spring appropriately 

#### Database Integration 
- Querying best practices, including performance, error handling, and scalability  
- Successful migration of existing database schema to accommodate changes to data 

#### API Implementation 
- Adherence to RESTful API and HTTP response principles 

#### Code Quality and Architecture 
- Unit testing approach

### Frontend 

#### UI Implementation 
- Intuitive and responsive design as well as overall user experience 
- Seamless integration of rating functionality into the existing UI 
- Understanding of existing components and library decisions 
- 508 compliance and accessibility considerations 

#### Code Quality and Architecture 
- Modular and maintainable codebase 
- Effective use of state management and data flow 
- Unit testing approach 

### General 
- Understanding and use of Git to set up the code repository and to implement the scenario 
- Familiarity with the chosen IDE(s) and capability to create new files, search, etc 

### Examples of bonus points after succesful completion of the main scenario
- Dockerfile(s) that successfully build and run the application
- Configured GitHub Actions workflow to build and test the application  
