json.extract! photo, :id, :name, :path, :message_id, :created_at, :updated_at
json.url photo_url(photo, format: :json)
