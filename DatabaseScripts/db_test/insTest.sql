ALTER SESSION SET NLS_TIMESTAMP_FORMAT='DD-MON-YY HH:MI:SSXFF';

insert into appuser (username, email, pass)
    values ('testuser', 'testemail', 'testpass');

insert into club (club_name, club_description)
    values ('Chess Club', 'A club for chess');

insert into membership 
    select appuser.user_id, club.club_id, '0'
    from appuser, club
    where
        appuser.username = 'testuser' and
        club.club_name = 'Chess Club';

insert into topic (topic_description)
    values ('Board game clubs');

insert into announcement (club_id, announcement_text, created_at, expires_at)
    values (
        (select club_id from club where club_name = 'Chess Club'),
        'Get your soap ready!',
        '01-JAN-2003 2:00:00',
        '01-JAN-2003 3:00:00'
    );


insert into appevent (club_id, event_start, event_end, event_description)
    values(
        (select club_id from club where club_name = 'Chess Club'),
        '02-JAN-2003 2:00:00',
        '02-JAN-2003 3:00:00',
        'That time of year where we wash our pawns'
    );

insert into rsvp 
    select appuser.user_id, appevent.event_id, 'Yes'
    from appuser, appevent
    where
        appuser.username = 'testuser' and
        appevent.event_description = 'That time of year where we wash our pawns';
