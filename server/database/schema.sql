CREATE TABLE users ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status ENUM('todo', 'done') DEFAULT 'todo',
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Exemple d'ajout de données
INSERT INTO users (name) VALUES
('Alice'),
('Julie'),
('Bob');

INSERT INTO tasks (title, status, user_id) VALUES
('Acheter du lait', 'todo', 1),
('Coder une API', 'todo', 1),
('Faire du sport', 'done', 2);
