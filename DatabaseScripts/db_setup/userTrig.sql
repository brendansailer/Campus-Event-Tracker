CREATE OR REPLACE TRIGGER user_on_insert
    BEFORE INSERT ON appuser
    FOR EACH ROW
BEGIN
    SELECT user_sequence.nextval
    INTO :new.user_id
    FROM dual;
END;

EXIT;
/