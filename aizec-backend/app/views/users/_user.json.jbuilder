json.extract! user, :id, :first_name, :second_name, :third_name, :role, :photo, :bio, :phone, :email, :parent_first_name, :parent_second_name, :parent_third_name, :parent_relationship, :status, :bonus_count, :gender, :address, :identifier_type, :identifier_number, :created_at, :updated_at
json.url user_url(user, format: :json)
