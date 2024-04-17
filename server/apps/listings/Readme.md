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