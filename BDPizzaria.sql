CREATE database pizzaria_final;
use pizzaria_final;

CREATE TABLE IF NOT EXISTS pedido_pizzaria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pizzaType VARCHAR(50) NOT NULL,
    bebidastype VARCHAR(50) NOT NULL,
    tamanhoPizza VARCHAR(20) NOT NULL
);


SELECT * FROM pizzaria_final.pedido_pizzaria;