class Message < ApplicationRecord
  belongs_to :user_from, class_name: 'User', foreign_key: 'user_id'
  has_many :message_users
  has_many :users, through: :message_users

  has_status %w[archived active]
  validates :to_entity_type, inclusion: { in: %w[admin user club group course all visit], message: "%{value} is not valid entity type." }
  validates :message_type, inclusion: { in: %w[report homework notification achivement poll skip], message: "%{value} is not valid message type." }
  
  include Archivable

end
