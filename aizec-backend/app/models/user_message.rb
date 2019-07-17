class UserMessage < ApplicationRecord
  belongs_to :user
  belongs_to :message

  validate :has_status, available_statuses: %w[readen not_readen]

  after_initialize :default_values

  private
    def default_values
      self.status ||= "not_readen"
    end
end
