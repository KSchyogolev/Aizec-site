class Payment < ApplicationRecord
  belongs_to :user
  belongs_to :course
  belongs_to :merch
  validates :cost, :numericality => { greater_than_or_equal_to: 0, only_integer: true }
  validates :bonuses, :numericality => { greater_than_or_equal_to: 0, only_integer: true }
  has_status %w[archived active]
  
  include Archivable

end