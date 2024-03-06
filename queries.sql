SELECT * FROM employees WHERE Salary>9;
SELECT title FROM movies WHERE Duration>=90;
SELECT email FROM customers WHERE AGE(DOB)>INTERVAL '21 years';
SELECT bID FROM theatre WHERE numRooms>5;
SELECT title, director, price FROM tickets WHERE price>10;
