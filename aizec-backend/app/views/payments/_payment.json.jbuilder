json.extract! payment, :id, :bonuses, :cost, :status, :user_id, :course_id, :merch_id, :created_at, :updated_at
json.url payment_url(payment, format: :json)
