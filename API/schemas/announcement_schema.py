from schemas.base_schema import ma

# Announcement Schema
class AnnouncementSchema(ma.Schema):
  class Meta:
    fields = ('announcement_id', 'club_id', 'announcement_text', 'created_at', 'expires_at', 'img_url')

# Init schema
announcement_schema = AnnouncementSchema()