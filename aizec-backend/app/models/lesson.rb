class Lesson < ApplicationRecord
  belongs_to :group
  belongs_to :lesson_info
  has_many :visits
  has_many :users, through: :visits

  has_status %w[archived closed open]
  
  include Archivable

  def open?
    status == "open"
  end

  def closed? 
    status == "closed"
  end
end
