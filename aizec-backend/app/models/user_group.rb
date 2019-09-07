class UserGroup < ApplicationRecord
  belongs_to :user
  belongs_to :group

  after_save :create_visits
  before_destroy :destroy_visits

  has_status %w[archived not_payed payed finished]
  
  include Archivable

  private
  def create_visits
    return nil unless group&.lessons&.present? 
    return nil unless user.present? 
    user.lessons << group.lessons
    # group.lessons.each do |lesson|
    #
    # end
  end

  def destroy_visits
    return nil unless group&.lessons&.present? 
    return nil unless user.present? 
    user.lessons.delete group.lessons
  end
end
