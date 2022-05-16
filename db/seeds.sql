INSERT INTO department (name)
VALUES
('Childrenswear'),
('Footwear and Accessories'),
('Menswear'),
('Womenswear'),
('Home Goods'),
('Electronics'),
('Seasonal'),
('Grocery'),
('Health & Beauty'),
('Checkout');

INSERT INTO role (title, salary, department_id)
VALUES
('Cashier - FT', 32000, 10),
('Cashier - PT', 16000, 10),
('Grocery Clerk - FT', 32000, 8),
('Grocery Clerk - PT', 16000, 8),
('Fashion Associate - FT', 32000, 3),
('Fashion Associate - PT', 16000, 4),
('Grocery and Hardgoods Manager', 38000, 8),
('Fashion Manager', 38000, 2),
('Assistant Manager', 42000, 7),
('Store Manager', 52000, 10);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
-- still need to add in manager_id
('Bruce', 'Banner', 10, NULL),
('Steven', 'Rogers', 9, 1),
('Tony', 'Stark', 8, 1),
('Victor', 'Shade', 7, 2),
('Natalia', 'Romanova', 6, 3),
('Peter', 'Parker', 5, 3),
('Stephen', 'Strange', 4, 2),
('Peter', 'Quill', 3, 2),
('Wanda', 'Maximoff', 2, 1);

