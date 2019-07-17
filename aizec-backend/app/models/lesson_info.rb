class LessonInfo < ApplicationRecord
  belongs_to :course
  belongs_to :lesson_type
  has_many :lessons

  validates :duration, :numericality => { greater_than_or_equal_to: 0, only_integer: true }
  validate :has_status, available_statuses: %w[archived active]
  
  include Archivable
end
