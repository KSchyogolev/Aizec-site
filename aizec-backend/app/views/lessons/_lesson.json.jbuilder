json.extract! lesson, :id, :start_time, :group_id, :lesson_info_id, :status, :created_at, :updated_at
json.url lesson_url(lesson, format: :json)
