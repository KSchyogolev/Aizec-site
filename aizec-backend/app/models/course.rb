class Course < ApplicationRecord
  has_and_belongs_to_many :clubs
  has_many :lesson_infos
  has_many :groups
  has_many :payments
  has_ancestry

  validates :type, inclusion: { in: %w[intensive regular], message: "%{value} is not valid type." }
  has_status %w[archived active]
  
  include Archivable
  include Receivable

end
