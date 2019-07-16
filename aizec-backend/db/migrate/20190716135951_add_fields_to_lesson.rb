class AddFieldsToLesson < ActiveRecord::Migration[5.2]
  def change
    add_reference :lessons, :group, foreign_key: true
    add_reference :lessons, :lesson_info, foreign_key: true
    add_column :lessons, :status, :string, :default => "closed"

    remove_column :lessons, :duration, :integer
    remove_column :lessons, :synopsys, :string
    remove_column :lessons, :homework, :string
    remove_column :lessons, :course_id, :integer
  end
end
