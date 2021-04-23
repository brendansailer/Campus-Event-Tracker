from schemas.base_schema import ma

# RSVP Schema
class RSVPSchema(ma.Schema):
  class Meta:
    fields = ('club_id', 'event_id', 'likelihood')

# Init schema
rsvp_schema = RSVPSchema()