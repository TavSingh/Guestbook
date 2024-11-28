USE guestbook;

DROP TABLE IF EXISTS guest;

CREATE TABLE guest(
	id INT AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    jobTitle VARCHAR(255),
    company VARCHAR(255),
    linkedin VARCHAR(255),
    email VARCHAR(255),
    howMeet VARCHAR(20),
    other VARCHAR(20),
    message VARCHAR(255),
    timestamp DATETIME DEFAULT NOW(),
    
    PRIMARY KEY (id)
);