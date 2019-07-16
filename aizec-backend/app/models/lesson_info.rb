class LessonInfo < ApplicationRecord
  belongs_to :course
  belongs_to :lesson_type
end
