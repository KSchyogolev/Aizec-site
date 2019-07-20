json.array! @visits do |visit| 
  json.extract! visit.lesson, :id, :start_time, :duration, :homework, :synopsys, :course_id, :created_at, :updated_at
  json.extract! visit, :status, :homework_comment, :teacher_comment, :homework_photos, :approve_status
  json.visit_id visit.id
  json.url lesson_url(visit.lesson, format: :json)
end
