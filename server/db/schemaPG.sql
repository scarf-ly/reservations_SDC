create table restaurants (
    id serial primary key,
    restaurant_name varchar(50),
    available_seats integer
);

create table reservations (
    restaurant_id integer references restaurants,
    moment integer,
    reservation_size integer
);