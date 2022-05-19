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
    ('Accountant', "30.000", 1),
    ('Social Media Team', "40.000", 3),
    ('Factory Worker', "20.000", 4),
    ('Graphic Designer', "20.000", 4),
    ('Sales Manager', "75.000", 1),
    ('Human Resources Specialist', "25.000", 2);

INSERT INTO
    employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Morgan", "Manning", 1, 3),
    ("Mahalik", "Jones", 1, 1),
    ("Harold", "Fishman", 2, 1),
    ("Lucy", "Gerome", 2, 1),
    ("Hannah", "Boulder", 3, 2),
    ("Nick", "Hodne", 3, 2),
    ("Camille", "Griffen", 4, 3),
    ("Larry", "Johnson", 4, 2),
    ("Matilda", "Yaya", 4, 2),
    ("Israel", "Israel", 4, 2),
    ("Jenna", "Dawson", 1, 2);