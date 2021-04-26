from schemas.base_schema import ma
from marshmallow import fields

# Nested in a Club Schema
class IndividualClubSchema(ma.Schema):
  class Meta:
    fields = ('club_id', 'club_name', 'club_description')

# Club Schema
class ClubSchema(ma.Schema):
  topic = fields.String()
  clubs = fields.Nested(IndividualClubSchema, many=True)

# Init schema
club_schema = ClubSchema(many=True)
individual_club_schema = IndividualClubSchema(many=True)