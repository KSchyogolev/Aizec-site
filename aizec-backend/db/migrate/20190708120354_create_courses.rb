class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.string :info
      t.integer :cost

      t.timestamps
    end
  end
end
