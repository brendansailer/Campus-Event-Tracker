-- RSVP( user_id, event_id, likelihood )

DROP TABLE rsvp CASCADE CONSTRAINTS;

CREATE TABLE rsvp (
    user_id NUMBER(10) NOT NULL,
    event_id NUMBER(10) NOT NULL,
    likelihood VARCHAR(3),
    CONSTRAINT rsvp_pk PRIMARY KEY (user_id, event_id),
    CONSTRAINT user_fk
        FOREIGN KEY (user_id)
        REFERENCES appuser(user_id),
    CONSTRAINT event_fk
        FOREIGN KEY (event_id)
        REFERENCES appevent(event_id)
);