class Announcement:
    def __init__(self, announcement_id, club_id, annoucement_text, created_at, expires_at, img_url):
        self.announcement_id = announcement_id
        self.club_id = club_id
        self.annoucement_text = annoucement_text
        self.created_at = created_at
        self.expires_at = expires_at
        self.img_url = img_url