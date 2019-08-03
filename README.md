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





Queries I want to support

Select all reservations and their times/sizes based on restaurant ID (have this done)
Find all reservations and their sizes for a specific restaurant at a specific time (I believe I have this as well)

Refactor timing to incldue people already sitting at the table maybe? 

area:
zip code (probably won't work, need to find a way to do surroundign area)

In order to cancel a specific reservation:
Have a unique reservation key that comes after a unique user id 
--in order for a user to cancel a rservation, first show their reservations. Then find the specicic one they want to cancel
  (that has stuff like time and size on it)

The way you know a specific reservation is based on usernmae, time, and party size
--but you also give it a unique uuid to keep things differentiated 



Queries
Get to see if there are tables at a specific restaurant at a specific time

Post (only able to do if get request says there is room) to add a new reservation of a certain size and user id to a specific frestaurant


Get to see the reservations (and their restaurants, size, and location) of a specific user id 
-in this view:
Patch to take an existing reservation, delete it, and change its time/number of people 
In order to do this you will have to do the get request on each of the time increments for that day 


patch only changes what you send in
put changes a whole record in a database 