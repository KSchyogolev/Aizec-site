json.extract! message, :id, :kind, :status, :user_id, :to_entity_type, :to_entity_id, :head_text, :full_text, :created_at, :updated_at
json.url message_url(message, format: :json)
