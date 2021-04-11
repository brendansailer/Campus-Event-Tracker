-- Membership( user_id, club_id, rank )

DROP TABLE membership;

CREATE TABLE membership (
    user_id NUMBER(10) NOT NULL,
    club_id NUMBER(10) NOT NULL,
    rank VARCHAR(3),
    CONSTRAINT membership_pk PRIMARY KEY (user_id, club_id),
    CONSTRAINT user_fk
        FOREIGN KEY (user_id)
        REFERENCES appuser(user_id),
    CONSTRAINT club_fk
        FOREIGN KEY (club_id)
        REFERENCES club(club_id)
);