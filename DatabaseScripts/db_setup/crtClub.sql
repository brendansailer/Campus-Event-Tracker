-- Club( club_id, name, description )

DROP TABLE club;
DROP SEQUENCE user_sequence;

CREATE TABLE club (
    club_id NUMBER(10) NOT NULL,
    club_name VARCHAR(100) NOT NULL,
    club_description VARCHAR(100),
    CONSTRAINT user_pk PRIMARY KEY (club_id)
);

CREATE SEQUENCE club_sequence
    minvalue 1
    start with 1
    increment by 1;

@clubTrig