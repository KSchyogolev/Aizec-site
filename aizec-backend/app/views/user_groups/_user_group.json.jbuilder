json.extract! user_group, :id, :payment_date, :status, :user_id, :group_id, :created_at, :updated_at
json.url user_group_url(user_group, format: :json)
