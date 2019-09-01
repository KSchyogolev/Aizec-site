json.array! @render_entities do |entity|
  case entity
  when Message
    json.message (json.partial! "messages/message", message: entity)
  when Course
    json.course (json.partial! "courses/course", course: entity)
  end
end