class DropCoursesUsers < ActiveRecord::Migration[5.2]
  def change
    drop_table :courses_users
  end
end
