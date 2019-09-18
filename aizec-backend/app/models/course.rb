class Course < ApplicationRecord
  has_and_belongs_to_many :clubs
  has_many :lesson_infos
  has_many :groups
  has_many :payments
  has_ancestry

  validates :kind, inclusion: { in: %w[intensive regular individual], message: "%{value} is not valid kind." }
  has_status %w[archived active]
  
  include Archivable
  include Receivable

  def self.get_relevant_to_user(user)
    user.courses
    # joins(:group, :user_group, :user)
  end
end
