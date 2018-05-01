DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vokel Skis", "Sports", 949.99, 3),
("Beanie", "Mens Accessories", 16.00, 5),
("Smart Wool Socks", "Mens Clothing", 22.00, 1),
("Hand Warmers", "Sports", 5.00, 100),
("Roxy Snowboard", "Sports", 314.95, 5),
("Burton Jacket", "Women's Clothing", 199.00, 2),
("Goggles", "Sports", 120.00, 1),
("Headphones", "Electronics", 66.99, 6),
("Ski Bag", "Sports", 110.00, 8),
("Sunglasses", "Men's Accessories", 20.00, 3),
("Sweatshirt", "Women's Clothing", 45.00, 4);