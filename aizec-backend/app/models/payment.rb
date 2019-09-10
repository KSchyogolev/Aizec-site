class Payment < ApplicationRecord
  belongs_to :user
  belongs_to :course, optional: true
  belongs_to :merch, optional: true
  validates :cost, :numericality => { greater_than_or_equal_to: 0, only_integer: true }
  validates :bonuses, :numericality => { greater_than_or_equal_to: 0, only_integer: true }
  has_status %w[archived ready done]

  
  include Archivable

end
