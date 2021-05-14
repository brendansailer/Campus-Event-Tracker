from schemas.base_schema import ma
from marshmallow import fields

# Membership Schema
class MembershipItemSchema(ma.Schema):
  class Meta:
    fields = ('club_id', 'club_name', 'club_description')

class MembershipSchema(ma.Schema):
  subscriptions = fields.Nested(MembershipItemSchema, many=True)

# Init schema
membership_schema = MembershipSchema() 
individual_membership_schema = MembershipSchema(many=True)