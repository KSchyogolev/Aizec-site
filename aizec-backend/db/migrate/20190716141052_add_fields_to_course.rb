class AddFieldsToCourse < ActiveRecord::Migration[5.2]
  def change
    add_column :courses, :status, :string
    add_column :courses, :name, :string
    add_column :courses, :short_description, :string
    add_column :courses, :full_description, :string
    add_column :courses, :cost_month, :integer
    add_column :courses, :type, :string

    remove_column :courses, :info, :string
  end
end
