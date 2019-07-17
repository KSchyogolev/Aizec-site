class Group < ApplicationRecord
  belongs_to :club
  belongs_to :course
  has_many :user_groups
  has_many :users, through: :user_groups
  validate :has_status, available_statuses: %w[archived active]
  
  include Archivable

end
