CREATE TABLE reservations (
    id int
)

CREATE TABLE reservations (
    id int,
    restaurant_name varchar,
    open_time smallint,
    close_time smallint,
    reservation_length tinyint,
    min_reservation_size tinyint,
    max_reservation_size tinyint,
    available_seats tinyint,
    day int,
    time smallint,
    party tinyint,
    PRIMARY KEY (id, day, time, party)
);