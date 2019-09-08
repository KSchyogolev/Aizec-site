class Visit < ApplicationRecord
  belongs_to :user
  belongs_to :lesson
  
  has_status %w[null ok skip_without_reason skip_not_approved skip_approved_teacher skip_approved]
  validates :approve_status, inclusion: { in: %w[null done_not_approved done_approved need_fix], message: "%{value} is not valid homework status." }
  after_initialize :default_values
  
  include Receivable

  private 
    def default_values
      status = 'null' if status.blank?
      approve_status = 'null' if approve_status.blank?
    end
end
