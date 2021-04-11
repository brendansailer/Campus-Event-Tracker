CREATE OR REPLACE TRIGGER topic_on_insert
    BEFORE INSERT ON topic
    FOR EACH ROW
BEGIN
    SELECT topic_sequence.nextval
    INTO :new.topic_id
    FROM dual;
END;

EXIT;
/