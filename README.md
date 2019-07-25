# reservation

### Listings
| HTTP Method   | Endpoint               | Description                                                   |
|:--------------|:---------------------------|:----------------------------------------------------------------------------|
| GET           | /reservation/:id           | Return reservation details about a specific restaurant at a specific time   |
| POST          | /reservation/:id           | Add a new restaurant                                                        |
| PUT           | /reservation/:id           | Update and replace reservation data for an existing restaurant              |
| PATCH         | /reservation/:id           | Update and modify details for a specific restaurant                         |
| DELETE        | /reservation/:id           | Delete a specific restaurant                                                |


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

