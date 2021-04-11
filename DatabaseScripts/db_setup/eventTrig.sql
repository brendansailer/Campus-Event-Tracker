CREATE OR REPLACE TRIGGER event_on_insert
    BEFORE INSERT ON appevent
    FOR EACH ROW
BEGIN
    SELECT event_sequence.nextval
    INTO :new.event_id
    FROM dual;
END;

EXIT;
/