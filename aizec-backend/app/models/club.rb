class Club < ApplicationRecord
  has_many :groups
  has_many_and_belongs_to :course
  
  validate :has_status, available_statuses: %w[archived active]
  
  include Archivable
  include Receivable

end
