from schemas.base_schema import ma
from marshmallow import fields

# Nested in a Topic Schema
class IndividualTopicSchema(ma.Schema):
  class Meta:
    fields = ('topic_id', 'topic_description')

# Topic Schema
class TopicSchema(ma.Schema):
  topics = fields.Nested(IndividualTopicSchema, many=True)

# Init schema
topic_schema = TopicSchema() # Create an array of these topics