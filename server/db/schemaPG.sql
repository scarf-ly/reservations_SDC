create table restaurants (
    id serial primary key,
    restaurant_name varchar(50),
    min_reservation_size smallint,
    max_reservation_size smallint,
    reservation_length smallint,
    open_time smallint,
    close_time smallint,
    available_seats smallint
);

create table reservations (
    restaurant_id integer,
    user_id integer,
    reservation_time integer,
    reservation_size smallint
);

build not just what FEC component can handle
build to specifications if you felt you were replacing the back end of yelp 
you want to have back end support front end if they could build additional features 
each restaurant shoudl have its own various timeframes that it can handle a reservation_size
some of these time slots increment by 30 minutes, some of them increment by 15 
hour range of reservations for each restaurant 

in restaurant table, 2 fields for min and max 
find all restauratns with availability for 3 people at this time 

\copy restaurants (restaurant_name, min_reservation_size, max_reservation_size, reservation_length, open_time, close_time, available_seats) FROM '/Users/keatontatooles/Documents/sdc/reservation/restaurants.csv' DELIMITER ',' CSV;
\copy reservations (restaurant_id, user_id, reservation_time, reservation_size) FROM '/Users/keatontatooles/Documents/sdc/reservation/reservations.csv' DELIMITER ',' CSV;


1
2
ALTER TABLE reservations 
ADD CONSTRAINT new_foreign_keys FOREIGN KEY (restaurant_id) REFERENCES restaurants (id);



\copy restaurants (restaurant_name, min_reservation_size, max_reservation_size, reservation_length, open_time, close_time, available_seats) FROM '/home/ec2-user/restaurants.csv' DELIMITER ',' CSV;

\copy reservations (restaurant_id, user_id, reservation_time, reservation_size) FROM '/home/ec2-user/reservations.csv' DELIMITER ',' CSV;
