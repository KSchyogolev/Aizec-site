class CreateJoinTableClubCourse < ActiveRecord::Migration[5.2]
  def change
    create_join_table :clubs, :courses do |t|
      t.index [:club_id, :course_id]
    end
  end
end
