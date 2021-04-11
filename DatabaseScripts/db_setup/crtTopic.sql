-- Topic( topic_id, description)

DROP TABLE topic;
DROP SEQUENCE topic_sequence;

CREATE TABLE topic (
    topic_id NUMBER(10) NOT NULL,
    topic_description VARCHAR(100) NOT NULL,
    CONSTRAINT topic_pk PRIMARY KEY (topic_id)
);

CREATE SEQUENCE topic_sequence
    minvalue 1
    start with 1
    increment by 1;

@topicTrig