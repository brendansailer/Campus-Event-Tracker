insert into appevent (club_id, event_start, event_end, event_description, location)
    values(
        (select club_id from club where club_name = 'Chess Club'),
        '12-MAY-2021 10:00:00',
        '12-MAY-2021 11:00:00',
        'Round Robin Tournament',
        'Duncan Student Center'
    );