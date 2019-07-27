json.extract! user, :id, :first_name, :second_name, :third_name, :role, :photo, :bio, :phone, :email, :status, :bonus_count, :gender, :address, :parents, :birthday, :created_at, :updated_at
json.url user_url(user, format: :json)
