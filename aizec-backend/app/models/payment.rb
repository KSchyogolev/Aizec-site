class Payment < ApplicationRecord
  belongs_to :user
  belongs_to :course
  belongs_to :merch
end
