

CREATE TABLE reservations (
    id int,
    restaurant_name varchar,
    min_reservation_size tinyint,
    max_reservation_size tinyint,
    reservation_length tinyint,
    open_time smallint,
    close_time smallint,
    available_seats tinyint,
    user_id int,
    reservation_time int,
    party tinyint,
    PRIMARY KEY (id, user_id, reservation_time, party)
);



COPY restaurants (restaurant_id, restaurant_name, min_reservation_size, max_reservation_size, reservation_length, open_time, close_time, available_seats) FROM '/Users/keatontatooles/Documents/sdc/reservation/restaurantsCA.csv' WITH DELIMITER=',' AND HEADER=FALSE;

COPY reservations_by_restaurant (restaurant_id, reservation_id, user_id, reservation_time, party) FROM '/Users/keatontatooles/Documents/sdc/reservation/reservationsRestaurantsCA.csv' WITH DELIMITER=',' AND HEADER=FALSE;

COPY reservations_by_user (user_id, reservation_id, restaurant_id, reservation_time, party) FROM '/Users/keatontatooles/Documents/sdc/reservation/reservationsUsersCA.csv' WITH DELIMITER=',' AND HEADER=FALSE;


CREATE TABLE restaurants (
    restaurant_id int,
    restaurant_name varchar,
    min_reservation_size tinyint,
    max_reservation_size tinyint,
    reservation_length tinyint,
    open_time smallint,
    close_time smallint,
    available_seats tinyint,
    PRIMARY KEY (restaurant_id)
);

CREATE TABLE reservations_by_restaurant (
    restaurant_id int,
    reservation_id int,
    user_id int,
    reservation_time int,
    party tinyint,
    PRIMARY KEY (restaurant_id, reservation_id)
);

CREATE TABLE reservations_by_user (
    user_id int,
    reservation_id int,
    restaurant_id int,
    reservation_time int,
    party tinyint,
    PRIMARY KEY (user_id, reservation_id)
);


./cassandra-loader -f /Users/keatontatooles/Documents/sdc/reservation/restaurantsCA.csv -host localhost -schema "yelp.reservations_by_restaurant(restaurant_id, restaurant_name, min_reservation_size, max_reservation_size, reservation_length, open_time, close_time, available_seats)"

./cassandra-loader -f /Users/keatontatooles/Documents/sdc/reservation/reservationsRestaurantsCA.csv -host localhost -schema "yelp.reservations_by_restaurant(restaurant_id, reservation_id, user_id, reservation_time, party)"