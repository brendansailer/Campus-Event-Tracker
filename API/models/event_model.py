class Event:
    def __init__(self, event_id, club_id, start_time, end_time, event_description, img_url):
        self.event_id = event_id
        self.club_id = club_id
        self.start_time = start_time
        self.end_time = end_time
        self.event_description = event_description
        self.img_url = img_url