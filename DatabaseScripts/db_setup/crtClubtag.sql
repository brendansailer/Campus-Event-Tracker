-- Club_tag( club_id, topic_id)

DROP TABLE membership;

CREATE TABLE club_tag (
    club_id NUMBER(10) NOT NULL,
    topic_id NUMBER(10) NOT NULL,
    CONSTRAINT membership_pk PRIMARY KEY (club_id, topic_id),
    CONSTRAINT topic_fk
        FOREIGN KEY (topic_id)
        REFERENCES topic(topic_id),
    CONSTRAINT club_fk
        FOREIGN KEY (club_id)
        REFERENCES club(club_id)
);