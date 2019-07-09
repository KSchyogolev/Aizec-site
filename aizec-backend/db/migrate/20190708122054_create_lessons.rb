class CreateLessons < ActiveRecord::Migration[5.2]
  def change
    create_table :lessons do |t|
      t.datetime :start_time
      t.integer :duration
      t.string :synopsys
      t.string :homework
      t.references :course, foreign_key: true

      t.timestamps
    end
  end
end
