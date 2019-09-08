class Lesson < ApplicationRecord
  belongs_to :group
  belongs_to :lesson_info
  has_many :visits
  has_many :users, through: :visits

  after_create :create_visits
  before_destroy :destroy_visits

  has_status %w[archived closed open]
  
  include Archivable

  def open?
    status == "open"
  end

  def closed? 
    status == "closed"
  end

  private
  def create_visits
    return nil unless lessons.present? 
    return nil unless user.present? 
    group.users.each do |user|
      user.lessons << self
    end
  end

  def destroy_visits
    return nil unless lessons.present? 
    return nil unless user.present? 
    group.users.each do |user|
      user.lessons.delete self
    end
  end
end
