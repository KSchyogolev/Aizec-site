json.extract! lesson, :id, :start_time, :group_id, :lesson_info_id, :status :created_at, :updated_at
json.extract! lesson.lesson_info, :duration, :short_description, :full_description, :course_id
json.lesson_type lesson.lesson_info.lesson_type.name
if lesson.open?
  json.extract! lesson.lesson_info, :homework, :synopsys
end
json.url lesson_url(lesson, format: :json)
