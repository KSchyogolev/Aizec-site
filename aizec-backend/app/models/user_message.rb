class UserMessage < ApplicationRecord
  belongs_to :user
  belongs_to :message

  has_status %w[readen not_readen]

  after_initialize :default_values

  private
    def default_values
      self.status ||= "not_readen"
    end
end
