class AddDurationToCourses < ActiveRecord::Migration[5.2]
  def change
    add_column :courses, :duration, :integer,
    add_column :courses, :lessonsWeek, :integer
  end
end
