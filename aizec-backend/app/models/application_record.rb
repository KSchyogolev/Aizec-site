class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def has_status(*attrs)
    validates :status, inclusion: { in: attrs[:available_statuses],
      message: "%{value} is not valid status." }
  end
end
