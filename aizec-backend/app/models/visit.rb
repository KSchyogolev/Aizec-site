class Visit < ApplicationRecord
  belongs_to :user
  belongs_to :lesson
  
  has_status %w[ok skip_without_reason skip_not_approved skip_approved_teacher skip_approved]
  validates :approve_status, inclusion: { in: %w[done_not_approved done_approved need_fix], message: "%{value} is not valid homework status." }

  include Receivable

end
