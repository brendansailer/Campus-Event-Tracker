SELECT m.club_id, c.club_name, c.club_description
FROM membership m
JOIN club c
    ON m.club_id = c.club_id
WHERE m.user_id = 1;