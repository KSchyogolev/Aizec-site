json.extract! merch, :id, :name, :photo_path, :cost, :short_description, :full_description, :created_at, :updated_at
json.url merch_url(merch, format: :json)
