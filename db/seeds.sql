INSERT INTO
    departments(name)
VALUES
    ('Sales'),
    ('Engineering'),
    ("Finance"),
    ('Legal');

INSERT INTO
    role(title, salary, department_id)
VALUES
    ('Accountant', "150000", 1),
    ('Social Media Team', "80000", 1),
    ('Factory Worker', "55000", 4),
    ('Graphic Designer', "80000", 4),
    ('Sales Manager', "100000", 1),
    ('Human Resources Specialist', "45000", 2);

INSERT INTO
    employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Morgan", "Manning", 1, 5),
    ("Mahalik", "Jones", 1, 5),
    ("Harold", "Fishman", 2, 1),
    ("Lucy", "Gerome", 6, 1),
    ("Hannah", "Boulder", 6, 2),
    ("Nick", "Hodne", 3, 2),
    ("Camille", "Griffen", 4, 3),
    ("Larry", "Johnson", 4, 2),
    ("Matilda", "Yaya", 5, 2),
    ("Israel", "Israel", 4, 2),
    ("Jenna", "Dawson", 5, 2);