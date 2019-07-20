class Club < ApplicationRecord
  has_many :groups
  has_and_belongs_to_many :course
  
  has_status %w[archived active]
  
  include Archivable
  include Receivable

end
