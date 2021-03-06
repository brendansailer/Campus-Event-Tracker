from schemas.base_schema import ma
from marshmallow import fields

# Nested in a Club Schema
class IndividualClubSchema(ma.Schema):
  class Meta:
    fields = ('club_id', 'club_name', 'club_description')

# Club schema with extra membership information
class ClubMemberSchema(ma.Schema):
  class Meta:
    fields = ('club_id', 'club_name', 'club_description', 'club_member')

# Club Schema
class ClubSchema(ma.Schema):
  topic = fields.String()
  topic_id = fields.String()
  clubs = fields.Nested(ClubMemberSchema, many=True)

# Init schema
club_schema = ClubSchema(many=True)
individual_club_schema = IndividualClubSchema(many=True)
club_member_schema = ClubMemberSchema(many=True)
# the individual schema didn't seem to work for individual objects so I made my own
single_club_schema = IndividualClubSchema()