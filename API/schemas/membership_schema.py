from schemas.base_schema import ma
from marshmallow import fields

# Membership Schema
class MembershipItemSchema(ma.Schema):
  class Meta:
    fields = ('club_id', 'club_name', 'club_description')

class MembershipSchema(ma.Schema):
  subscriptions = fields.Nested(MembershipItemSchema, many=True)

# Membership Schema
class MemberItemSchema(ma.Schema):
  class Meta:
    fields = ('user_id', 'username')

# Init schema
membership_schema = MembershipSchema() 
individual_membership_schema = MemberItemSchema(many=True)