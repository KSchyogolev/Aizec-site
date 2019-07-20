class Group < ApplicationRecord
  belongs_to :club
  belongs_to :course
  has_many :user_groups
  has_many :users, through: :user_groups
  has_status %w[archived active]
  
  include Archivable
  include Receivable

end
