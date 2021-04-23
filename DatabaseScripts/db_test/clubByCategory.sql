SELECT ct.club_id, c.club_name, c.club_description
FROM club_tag ct
JOIN club c ON c.club_id = ct.club_id
WHERE ct.topic_id = 1;