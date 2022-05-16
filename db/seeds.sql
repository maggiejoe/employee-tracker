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
('Health & Beauty');

INSERT INTO role (title, salary, department_id)
VALUES
('Cashier - FT', 32000, 001),
('Cashier - PT', 16000, 002),
('Grocery Clerk - FT', 32000, 003),
('Grocery Clerk - PT', 16000, 004),
('Fashion Associate - FT', 32000, 005),
('Fashion Associate - PT', 16000, 006),
('Grocery and Hardgoods Manager', 38000, 007),
('Fashion Manager', 38000, 008),
('Assistant Manager', 42000, 009),
('Store Manager', 52000, 010);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
-- still need to add in manager_id
('Bruce', 'Banner', 009, 010),
('Steven', 'Rogers', 008, 010),
('Tony', 'Stark', 007, 010),
('Victor', 'Shade', 006, 008),
('Natalia', 'Romanova', 005, 008),
('Peter', 'Parker', 004, 007),
('Stephen', 'Strange', 003, 007),
('Peter', 'Quill', 002, 009),
('Wanda', 'Maximoff', 001, 009);

