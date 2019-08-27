json.extract! group, :id, :name, :status, :club_id, :course_id, :created_at, :updated_at
json.url group_url(group, format: :json)
json.users do 
  json.array! group.users, partial: "users/user", as: :user
end