INSERT INTO
    departments(name)
VALUES
    ('Accounting'),
    ('Human Resources'),
    ("Marketing"),
    ('Assembly'),
    ('Design');

INSERT INTO
    role(title, salary, department_id)
VALUES
    ('Accountant', "30.000", 1),
    ('Social Media Team', "40.000", 3),
    ('Factory Worker', "20.000", 4),
    ('Graphic Designer', "20.000", 5),
    ('Human Resources Specialist', "25.000", 2);

INSERT INTO
    employee(first_name, last_name, role_id)
VALUES
    ("Monger", "Man", 1),
    ("Mahalik", "Jones", 1),
    ("Harold", "Fishman", 2),
    ("Lucy", "Gerome", 2),
    ("Hannah", "Boulder", 3),
    ("Nick", "Hodne", 3),
    ("Camille", "Griffen", 4),
    ("Larry", "Johnson", 4),
    ("Matilda", "Yaya", 5),
    ("Israel", "Israel", 5),
    ("Jenna", "Dawson", 1);