json.extract! lesson_info, :id, :short_description, :full_description, :synopsys, :homework, :duration, :status, :course_id, :lesson_type_id, :created_at, :updated_at
json.url lesson_info_url(lesson_info, format: :json)
json.lessons do 
  json.array! lesson_info.lessons, partial: "lessons/lesson", as: :lesson
end
json.groups do 
  json.array! lesson_info.course.groups, partial: "groups/group", as: :group
end
json.files do 
  json.array! lesson_info.files do |file|
    json.url url_for(file)
  end
end