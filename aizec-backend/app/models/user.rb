class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JWTBlacklist
  
  has_many :user_groups
  has_many :groups, through: :user_groups
  has_many :visits
  has_many :lessons, through: :visits

  validate :has_status, available_statuses: %w[archived active not_activated not_approved]

  after_initialize :default_values
  
  include Archivable
  include Receivable

  def admin?
    role == 'admin'
  end

  def teacher?
    role == 'teacher'
  end

  def user?
    role == 'user'
  end

  def messages
    msgs = super.or(Message.where(to_entity_type: "all"))
    msgs = msgs.or(Message.where(to_entity_type: "admin")) if admin?
  end

  private
    def default_values
      self.status ||= "not_activated"
    end

end
