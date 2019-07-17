class UserGroup < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validate :has_status, available_statuses: %w[archived not_payed payed finished]
  
  include Archivable

end
