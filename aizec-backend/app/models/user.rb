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
  has_many :user_messages
  has_many :messages, through: :user_messages
  has_many :payments
  has_many :courses, through: :payments
  has_many :merches, through: :payments

  has_status %w[archived active not_activated not_approved]

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

  def courses
    Course.joins(groups: [{user_groups: :user}]).where(:users => {:id => id}).uniq
  end

  def clubs
    Club.joins(groups: [{user_groups: :user}]).where(:users => {:id => id}).uniq
  end

  def received_messages
    msgs = super.or(Message.where(to_entity_type: "all"))
    msgs = msgs.or(Message.where(to_entity_type: "admin")) if admin?
    msgs
  end

  def sent
    Message.where(user_id: id)
  end

  private
    def default_values
      self.status ||= "not_activated"
    end

end
