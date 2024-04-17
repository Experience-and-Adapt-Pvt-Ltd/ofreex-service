This Microservice is used for saving authentication of users(Buyer)
First Migrate Db: npx prisma migrate dev
To run sever:  nx serve users

User.Service.ts:
User and Seller Registration: It supports registering new users and sellers, including email and phone number uniqueness checks, password hashing, and sending an activation code via email for account activation.

GraphQL Query for Verifying Seller: During user registration, it sends a GraphQL query to verify if the email is already registered as a seller, preventing the same email from being used for both user and seller accounts.

Account Activation: Users and sellers activate their accounts by submitting an activation token and code they received in their email, which verifies their email address.

Login: It allows users to log in by verifying their email and password, generating JWT (JSON Web Token) tokens for session management.

Password Reset: It supports password reset functionality through a flow where a user requests a password reset link, receives it via email, and uses it to set a new password.

User Profile Update: Allows updating user information in the database.

Logout: It provides a mechanism for logging out users, presumably by invalidating their session tokens.

User Data Fetching: Includes various functions for fetching user data, such as finding users by id or email, getting lists of premium or basic users, and managing favorite IDs for users.

Utility Functions: It includes utility functions like creating activation tokens for users and sellers, generating forgot password links, and checking if a user exists by email.

User.resolver.ts: 

Queries and Mutations: The class defines GraphQL queries and mutations for various user-related operations. Queries are used for fetching data, such as getting user details, checking if a user exists, and listing premium and basic users. Mutations are used for operations that change data, like registering users and sellers, activating accounts, logging in, resetting passwords, and updating user information.

Validation: It performs basic input validation, such as checking if required fields are provided during registration.

Error Handling: It includes error handling for various scenarios, such as invalid inputs and failed operations, by throwing exceptions like BadRequestException.

Security: It uses the AuthGuard for some operations, ensuring that only authenticated requests are allowed for certain actions like logging out a user or retrieving the logged-in user's information.

Context: The resolver methods make use of the @Context() decorator to access the HTTP request and response objects. This is used, for example, to pass the response object to the service for setting cookies or headers.

User Registration and Activation: It supports registering users and sellers, along with activating their accounts by verifying activation tokens and codes sent via email.

Authentication: It includes login functionality, allowing users to authenticate by verifying their email and password. It also supports logging out by clearing user session data.

Password Management: Supports password reset functionality, allowing users to request a password reset link sent to their email and to reset their password using the provided token.

User Information Fetching: Provides functionality to fetch users by ID or email, check if a user exists, and list users filtered by their subscription status (premium or basic).

User Update: Allows for updating user details with given information.


users.controllers:
Endpoints
GET /users/: Displays a welcome message from the Users Controller.
POST /users/register: Registers a new user. Expects a body with registration details.
POST /users/activate: Activates a user account using an activation token provided in the request body.
POST /users/login: Authenticates a user and returns access and refresh tokens.
POST /users/forgot-password: Initiates the password reset process by generating a password reset link.
POST /users/reset-password: Resets a user's password using a token provided in the request body.
GET /users: Retrieves a list of all users. Requires JWT authentication.
GET /users/premium: Retrieves a list of premium users. Requires JWT authentication.
