# Job Portal

## Setup Instructions

Follow these steps to set up the **Job Portal** project locally:

### Prerequisites

- **Node.js** (version 14 or higher)
- **MongoDB** (running locally or use MongoDB Atlas)
- **npm** or **yarn**

### Step 1: Clone the repository

Clone the repository to your local machine using:

```bash
git clone https://github.com/Ranjan-chauhan/Job-Portal.git


Step 2: Install Dependencies
Navigate to the project folder and install dependencies for both the client and server.

Server Setup:
Navigate to the server directory:

bash
Copy
Edit
cd server
Install the required dependencies:

bash
Copy
Edit
npm install


Client Setup:
Navigate to the client directory:

bash
Copy
Edit
cd client
Install the required dependencies:

bash
Copy
Edit
npm install


Step 3: Set Up Environment Variables
Create a .env file in the root directory of the server, and add the following variables:

ini
Copy
Edit
PORT=5000
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string


Step 4: Run the Project
Start the Server
Navigate to the server directory:

cd server
Start the server:

npm run dev

Start the Client
Navigate to the client directory:


cd client
Start the client:


npm start

Now you can access the application at http://localhost:3000.

Features & Implementation Details
1. User Authentication (JWT)
Users (jobseekers & employers) can register and login using email and password.

JWT authentication is used to authenticate users on every API request.

Tokens are stored in localStorage for jobseekers and employers after successful login.

2. Job Listings (CRUD)
Employers can create, read, update, and delete job listings.

Jobseekers can view job listings and apply for jobs.

3. Job Application System
Jobseekers can upload their resume (PDF format) and submit a cover letter while applying for jobs.

The system allows jobseekers to track their applications.

4. Role-Based Access Control (RBAC)
Role-based authorization is implemented using JWT. Only jobseekers can apply for jobs, and only employers can view applicants and manage job listings.

5. File Upload (Resume)
Jobseekers can upload their resume (PDF file) as part of the application process. The resume is handled via multer.

6. Job Dashboard
Employers can see a dashboard with all applicants for their job listings.

Jobseekers can view the status of their job applications.

7. Responsive UI
The client-side is built using React and TailwindCSS, ensuring a responsive and smooth user experience across all devices.

8. Frontend Features
Jobseekers can apply for jobs directly from the job details page.

Employers can view the applicants for each job listing they post.

Technologies Used:
Frontend: React.js, TailwindCSS, React Router

Backend: Node.js, Express.js, MongoDB, JWT, Multer

Authentication: JWT with role-based access control (RBAC)

File Upload: Multer for handling resume uploads

