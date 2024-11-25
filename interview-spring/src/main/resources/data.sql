INSERT INTO movie (
    id, 
    title, 
    original_title, 
    synopsis, 
    runtime, 
    release_date, 
    country, 
    budget
) VALUES (
    RANDOM_UUID(), 
    'The Godfather',
    'The Godfather',
    'The aging patriarch of an organized crime dynasty transfers control to his son.',
    175,
    '1972-03-24',
    'USA',
    6500000
), (
    RANDOM_UUID(),
    'Inception',
    'Inception',
    'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.',
    148,
    '2010-07-16',
    'USA',
    160000000
);