json.extract! course, :id, :short_description, :full_description, :kind, :cost_month, :cost, :duration, :lessonsWeek, :created_at, :updated_at
json.url course_url(course, format: :json)
json.photos do 
  json.array! course.photos do |photo|
    json.url url_for(photo)
  end
end
