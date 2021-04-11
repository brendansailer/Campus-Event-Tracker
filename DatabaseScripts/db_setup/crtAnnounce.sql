-- Announcement( announcement_id, club_id, announcement_text, created_at, expires_at, img_url)

DROP TABLE announcement CASCADE CONSTRAINTS;
DROP SEQUENCE announcement_sequence;

CREATE TABLE announcement (
    announcement_id NUMBER(10) NOT NULL,
    club_id NUMBER(10) NOT NULL,
    announcement_text VARCHAR(100),
    created_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    img_url VARCHAR(100),
    CONSTRAINT announcement_pk PRIMARY KEY (announcement_id),
    CONSTRAINT club_fk_announcement
        FOREIGN KEY (club_id)
        REFERENCES club(club_id)
);

CREATE SEQUENCE announcement_sequence
    minvalue 1
    start with 1
    increment by 1;

@announceTrig