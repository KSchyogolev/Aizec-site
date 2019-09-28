json.extract! message, :id, :kind, :status, :user_id, :to_entity_type, :to_entity_id, :head_text, :price, :full_text, :created_at, :updated_at
json.url message_url(message, format: :json)
json.photos do 
  json.array! message.photos do |photo|
    json.url url_for(photo)
  end
end