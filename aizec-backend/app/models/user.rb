class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JWTBlacklist
  
  has_and_belongs_to_many :courses
  has_many :visits
  has_many :lessons, through: :visits

  def admin?
    role == 'admin'
  end

  def teacher?
    role == 'teacher'
  end

  def user?
    role == 'user'
  end
end
