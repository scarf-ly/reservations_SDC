# reservation

### Listings
| HTTP Method   | Endpoint               | Description                                                   |
|:--------------|:---------------------------|:----------------------------------------------------------------------------|
| GET           | /reservation/:restaurantId | Return reservation details about a specific restaurant at a specific time   |
| POST          | /reservation/:restuarantId | Add a new restaurant                                                        |
| PUT           | /api/rooms/:listingid/     | Update and replace reservation data for an existing restaurant              |
| PATCH         | /api/rooms/:listingid/     | Update and modify details for a specific restaurant                         |
| DELETE        | /api/rooms/:listingid/     | Delete a specific restaurant                                                |


GET Params:
query = [unix timestamp]
restaurant_id = [integer]

POST Params:
restaurant_id = [integer]
restaurant_name = [string]


PUT/PATCH Params:
query = [unix timestamp]
restaurant_id = [integer]
reservation_size = [integer]

