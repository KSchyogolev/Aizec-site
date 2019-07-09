class CreateVisits < ActiveRecord::Migration[5.2]
  def change
    create_table :visits do |t|
      t.string :status
      t.string :homework_comment
      t.string :teacher_comment
      t.string :homework_photos
      t.string :approve_status
      t.references :user, foreign_key: true
      t.references :lesson, foreign_key: true

      t.timestamps
    end
  end
end
