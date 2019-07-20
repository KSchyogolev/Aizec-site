class CreateLessonInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :lesson_infos do |t|
      t.string :short_description
      t.string :full_description
      t.string :synopsys
      t.string :homework
      t.integer :duration
      t.string :status
      t.references :course, foreign_key: true, null: false
      t.references :lesson_type, foreign_key: true

      t.timestamps
    end
  end
end
