-- event( event_id, club_id, date, start_time, end_time, description, img_url )

DROP TABLE appevent;
DROP SEQUENCE event_sequence;

CREATE TABLE appevent (
    event_id NUMBER(10) NOT NULL,
    club_id NUMBER(10) NOT NULL,
    event_start TIMESTAMP NOT NULL,
    event_end TIMESTAMP NOT NULL,
    event_description VARCHAR(100),
    img_url VARCHAR(100),
    CONSTRAINT event_pk PRIMARY KEY (event_id)
    CONSTRAINT club_fk
        FOREIGN KEY (club_id)
        REFERENCES club(club_id)
);

CREATE SEQUENCE event_sequence
    minvalue 1
    start with 1
    increment by 1;

@eventTrig