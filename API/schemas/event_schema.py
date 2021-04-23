from schemas.base_schema import ma

# Event Schema
class EventSchema(ma.Schema):
  class Meta:
    fields = ('event_id', 'club_id', 'start_time', 'end_time', 'event_description', 'img_url')

# Init schema
event_schema = EventSchema()