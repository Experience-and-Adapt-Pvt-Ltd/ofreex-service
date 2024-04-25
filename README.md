# ofreex-service
OFreeX Backend and Front End code

Frontend:

To Install Package: npm install
To run server: npm run dev

pages: This is for nextauth
app: It contains all components of website
hooks: It have all custom hooks that used to open and close modal
favourites: It Will store all faviourite listing of user
listings: It will list all the listed product of seller
action:
getCategories.ts: This action could retrieve a list of categories from a database or an API.
getCurrentSeller.ts: This action might fetch data related to the current seller, such as profile information or active listings, from the backend.
getCurrentUser.ts: Similar to getCurrentSeller, but this action would retrieve data related to the currently logged-in user.
getFavoriteListings.ts: This action could get a list of listings or items that the user has marked as favorites.
getListingById.ts: This action is likely to retrieve the details of a specific listing, provided an ID for that listing.
getListings.ts: This would generally fetch a list of all listings or a subset based on certain criteria.

components: It contains all components of website
Providers: It contains React Toast Provider


Backend

Users Microservice:
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


Seller: 
Same for seller as User

Listing:
This Microservice is used for listing product updating data of product 
First Migrate Db: npx prisma migrate dev
To run sever:  nx serve listings


listing.service.ts
Categories Management: Supports operations for creating, fetching, updating, and removing categories. Each category is defined with a label, description, and icon, providing a structured classification for listings.

Listings Management: Facilitates comprehensive management of listings, including creating, updating, finding, and deleting operations. Listings are rich in details, including title, description, price, condition, category classifications, and more.

Premium and Basic User Listings: Integrates with external services to fetch user types (premium or basic) and filters listings based on these types. This allows for the retrieval of listings specific to the user's subscription status.

Favorites Management: Offers functionality to fetch favorite listings of users. This feature requires integration with external services to obtain a user's favorite listings based on their IDs.

Custom Listings Retrieval: Supports fetching listings by various criteria, including category, subcategory, and user preferences. This is crucial for delivering personalized content to users.

listing.controller.ts
Endpint: 
POST /listings/getListings: Retrieves listings with optional limit parameter in the request body.
POST /listings/favListings: Retrieves favorite listings for a user, identified by userId in the request body.
POST /listings/getListingsByUserId: Fetches listings created by a specific user, identified by userId in the request body.
POST /listings/premium: Retrieves premium listings with optional limit parameter in the request body.
GET /listings/premiumUsers: Fetches users with premium listings.
GET /listings/: Welcome message from the Listings API.
GET /listings/:id: Retrieves a specific listing by its id.
POST /listings/: Creates a new listing. Requires listing details in the request body.
PATCH /listings/:id: Updates a specific listing identified by its id. Requires partial listing details in the request body.
DELETE /listings/:id: Deletes a specific listing identified by its id.
GET /listings/category/:category: Retrieves listings by category. Supports an optional subCategory query parameter.