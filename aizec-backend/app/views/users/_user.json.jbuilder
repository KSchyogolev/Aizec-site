json.extract! user, :id, :login, :first_name, :second_name, :role, :photo, :bio, :phone, :email, :created_at, :updated_at
json.url user_url(user, format: :json)
