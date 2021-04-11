CREATE OR REPLACE TRIGGER announcement_on_insert
    BEFORE INSERT ON announcement
    FOR EACH ROW
BEGIN
    SELECT announcement_sequence.nextval
    INTO :new.announcement_id
    FROM dual;
END;

EXIT;
/