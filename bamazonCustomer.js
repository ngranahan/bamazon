var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Phonse%Duke1833",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    shop();
});

function shop() {

    var query = "SELECT * FROM products";

    connection.query(query, function (err, res) {

        console.log("\nAVAILABLE PRODUCTS:\n");

        for (var i = 0; i < res.length; i++) {
            console.log("Item: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: $" + res[i].price + " || Available: " + res[i].stock_quantity + " || Item ID: " + res[i].item_id);
        }

        console.log("\n----------------------------------------------------\n")
        customerRequest();
    });

};

function customerRequest() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What's the product ID for the item you wish to purchase?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
        }
    ]).then(function (order) {

        connection.query("SELECT * FROM products WHERE item_id=?", [order.id], function (err, res) {

            if (order.quantity <= res[0].stock_quantity) {
                var itemOrdered = order.id;
                var quantityUpdate = res[0].stock_quantity - order.quantity;
                var totalPrice = res[0].price * order.quantity;
                console.log("\nORDER SUMMARY:\n" + res[0].product_name + "\nQuantity: " + order.quantity + "\nTotal Price: $" + totalPrice);
                updateQuantity(quantityUpdate, itemOrdered);
            } else {
                console.log("Sorry, not enough product in stock.");
                shopAgain();
            }

        });
    });
};

function updateQuantity(quantityUpdate, itemOrdered) {
    var query = connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [quantityUpdate, itemOrdered], function (err, res) {
        console.log("\nYour order has been placed.\n");
        shopAgain();
    });
}

function shopAgain() {
    inquirer.prompt([
        {
            name: "shopAgain",
            type: "confirm",
            message: "Keep Shopping?"
        }
    ]).then(function (shop) {

        if (shop.shopAgain) {
            customerRequest();
        } else {
            console.log("\nOk, see ya later!")
        }
    });
}
