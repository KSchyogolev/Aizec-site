class Message < ApplicationRecord
  belongs_to :user_from, class_name: 'User', foreign_key: 'user_id'
  has_many :message_users
  has_many :users, through: :message_users
  has_many_attached :photos

  has_status %w[archived active]
  validates :to_entity_type, inclusion: { in: %w[admin user club group course all visit], message: "%{value} is not valid entity kind." }
  validates :kind, inclusion: { in: %w[report homework notification achivement poll skip offer], message: "%{value} is not valid message kind." }
  
  include Archivable

end
