USE munch;

CREATE TABLE reservation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT NOT NULL,
  timestamp INT NOT NULL,
  num_of_seat INT NOT NULL
)