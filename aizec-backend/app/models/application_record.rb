class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  self.inheritance_column = 'type_for_inheritance'

  def self.has_status(available_statuses)
    validates :status, inclusion: { in: available_statuses,
      message: "%{value} is not valid status." }
  end
end
