json.extract! user_message, :id, :chosen_option, :status, :user_id, :message_id, :created_at, :updated_at
json.url user_message_url(user_message, format: :json)
