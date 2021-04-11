CREATE OR REPLACE TRIGGER club_on_insert
    BEFORE INSERT ON club
    FOR EACH ROW
BEGIN
    SELECT club_sequence.nextval
    INTO :new.club_id
    FROM dual;
END;

EXIT;
/