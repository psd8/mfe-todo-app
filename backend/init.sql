

CREATE SCHEMA IF NOT EXISTS app;
CREATE TABLE app.documents (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255),
    title VARCHAR(255),
    thumbnail VARCHAR(255),
    position INTEGER
);

INSERT INTO app.documents (type, title, thumbnail, position) VALUES
('bank-draft', 'Bank Draft', 'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg', 1),
('bill-of-lading', 'Bill of Lading', 'https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg', 2),
('invoice', 'Invoice', 'https://www.argospetinsurance.co.uk/assets/uploads/2017/12/cat-pet-animal-domestic-104827.jpeg', 3),
('bank-draft-2', 'Bank Draft 2', 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&h=350', 4),
('bill-of-lading-2', 'Bill of Lading 2', 'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 5);
