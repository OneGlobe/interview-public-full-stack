-- Movies data only - users are created via UserService in DataInitializer

-- Insert movies
INSERT INTO movie (
    id, 
    title, 
    original_title, 
    synopsis, 
    runtime, 
    release_date, 
    country, 
    budget,
    created_by,
    created_timestamp,
    last_modified_by,
    last_modified_timestamp
) VALUES (
    RANDOM_UUID(), 
    'The Godfather',
    'The Godfather',
    'The aging patriarch of an organized crime dynasty transfers control to his son.',
    175,
    '1972-03-24',
    'USA',
    6500000,
    'reviewer3',
    CURRENT_TIMESTAMP,
    'reviewer3',
    CURRENT_TIMESTAMP
), (
    RANDOM_UUID(),
    'Inception',
    'Inception',
    'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.',
    148,
    '2010-07-16',
    'USA',
    160000000,
    'reviewer3',
    CURRENT_TIMESTAMP,
    'reviewer3',
    CURRENT_TIMESTAMP
);