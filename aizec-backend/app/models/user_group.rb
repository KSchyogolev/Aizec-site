class UserGroup < ApplicationRecord
  belongs_to :user
  belongs_to :group


  has_status %w[archived not_payed payed finished]
  
  include Archivable

end
