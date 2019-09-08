class Group < ApplicationRecord
  belongs_to :club
  belongs_to :course
  has_many :user_groups
  has_many :users, through: :user_groups, :after_add => :create_visits, :after_remove => :destroy_visits
  has_many :lessons
  has_status %w[archived active]
  
  include Archivable
  include Receivable

  private
  def create_visits(user)
    return nil unless lessons.present? 
    return nil unless user.present? 
    user.lessons << lessons
  end

  def destroy_visits(user)
    return nil unless lessons.present? 
    return nil unless user.present? 
    user.lessons.delete lessons
  end
end
