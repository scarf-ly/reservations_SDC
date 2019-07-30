

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



COPY reservations (id, restaurant_name, min_reservation_size, max_reservation_size, reservation_length, open_time, close_time, available_seats, user_id, reservation_time, party) FROM '/Users/keatontatooles/Documents/sdc/reservation/restaurantsCA.csv' WITH DELIMITER=',' AND HEADER=FALSE;

COPY reservations (id, user_id, reservation_time, party) FROM '/Users/keatontatooles/Documents/sdc/reservation/reservationsCA.csv' WITH DELIMITER=',' AND HEADER=FALSE;