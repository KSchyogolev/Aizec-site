class Lesson < ApplicationRecord
  belongs_to :course
  has_many :visits
  has_many :users, through: :visits
end
