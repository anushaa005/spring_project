Job Portal is a full-featured job listing and application management system that streamlines the hiring process. Employers can post job openings, manage applications, and track candidates, while job seekers can browse opportunities, submit applications, and monitor their application status.
Why This Project?
As someone passionate about building practical solutions, I wanted to create a platform that addresses real-world needs in the job market. This project interested me because:

Complex problem domain: Managing users, jobs, and applications requires careful data modeling
Full-stack challenge: Opportunity to work with modern frontend (React) and robust backend (Spring Boot)
User experience focus: Creating intuitive interfaces for two distinct user types (employers and job seekers)
Key Features
For Job Seekers 

Browse Jobs: Search and filter through available positions
Smart Search: Find jobs by keyword and location
Easy Applications: Apply to jobs with a single click
Application Tracking: Monitor the status of all applications (Applied, Shortlisted, Rejected)

For Employers 

Post Jobs: Create detailed job listings with company info
Manage Listings: View and delete your job posts
Review Applications: See all candidates who applied
Application Management: Update application status (shortlist or reject candidates)

Security & Authentication 

JWT-based authentication
Role-based access control (Job Seeker vs Employer)
Secure password encryption
Protected routes and API endpoints

## Technology Stack
**Backend**

1. Spring Boot 3 - Java framework
2. Spring Security - Authentication & authorization
3. JWT - Token-based auth
4. MySQL - Relational database
5. JPA/Hibernate - ORM
6. Lombok - Boilerplate reduction

**Frontend**
1. React 19 - Modern UI library
2. React Router - Client-side routing
3. Tailwind CSS 4 - Utility-first styling


## Prerequisites
Before you begin, ensure you have the following installed:

Java 17 or higher 
Node.js 20 or higher 
MySQL 8.0 or higher 
Maven (usually comes with Java IDEs)
Git 

1. **Clone the Repository**
bashgit clone https://github.com/anushaa005/springboot.git
cd job-portal
2. **Database Setup**

Start MySQL and log in:

bash   mysql -u root -p

Create the database:

sql   CREATE DATABASE demo_db;
   exit;

Update database credentials (if different from defaults):

Open src/main/resources/application.properties
Update the following lines with your MySQL credentials:



properties     spring.datasource.username=root
     spring.datasource.password=password
     
3. **Backend Setup**

Navigate to the project root (if not already there):

bash   cd job-portal

Build the backend:

bash   mvn clean install
(This may take a few minutes on first run as Maven downloads dependencies)

Run the Spring Boot application:

bash   mvn spring-boot:run
You should see output ending with:
   Started JobPortalApplication in X.XXX seconds

Verify the backend is running:

Open your browser to http://localhost:8880/swagger-ui.html
You should see the API documentation


4. **Frontend Setup**

Open a new terminal and navigate to the frontend directory:

bash   cd frontend

Install dependencies:

bash   npm install
(This may take 2-3 minutes)

Start the development server:

bash   npm run dev

Open the application:

The terminal will show: Local: http://localhost:5173/
Open your browser to http://localhost:5173



5. **Create Your First Account**

Click "Sign Up" in the top right
Fill in your details:

Name: Anusha
Email: anushasinghc11@gmail.com
Password: (minimum 6 characters)
Role: Select either "Job Seeker" or "Employer"


Click "Create Account"
You'll be redirected to login - use the same credentials

Future Enhancements

## Future Enhancements

1. **Resume Upload and Management**  
   Enable users to upload, update, and manage resumes securely.

2. **Email Notification System**  
   Send automated email notifications for job applications, status updates, and alerts.

3. **User Profile Editing**  
   Allow users to edit personal information, skills, and preferences.

4. **Saved Jobs Feature**  
   Enable users to bookmark and easily revisit job listings.

5. **Company Profiles with Logos**  
   Display detailed company profiles including logos and company information.

6. **Interview Scheduling System**  
   Facilitate interview scheduling between recruiters and candidates.
