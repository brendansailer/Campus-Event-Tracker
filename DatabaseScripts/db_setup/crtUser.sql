-- User( user_id, username, email, password )

DROP TABLE appuser CASCADE CONSTRAINTS;
DROP SEQUENCE user_sequence;

CREATE TABLE appuser (
    user_id NUMBER(10) NOT NULL,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30),
    pass VARCHAR(30) NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (user_id)
);

CREATE SEQUENCE user_sequence
    minvalue 1
    start with 1
    increment by 1;

@userTrig