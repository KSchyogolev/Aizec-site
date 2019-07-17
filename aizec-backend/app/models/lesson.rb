class Lesson < ApplicationRecord
  belongs_to :group
  belongs_to :lesson_info
  has_many :visits
  has_many :users, through: :visits
  
  validate :has_status, available_statuses: %w[archived closed open]
  
  include Archivable

end
