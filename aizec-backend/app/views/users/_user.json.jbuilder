json.extract! user, :id, :first_name, :second_name, :third_name, :role, :photo, :bio, :phone, :email, :status, :bonus_count, :gender, :address, :birthday, :level, :club, :created_at, :updated_at
json.url user_url(user, format: :json)
json.set! :parents, user.parents.present? ? MultiJson.load(user.parents) : nil
if user.photo.attached?
  json.photo url_for(user.photo) 
else 
  json.photo nil
end