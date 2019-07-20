class AddAncestryToCourse < ActiveRecord::Migration[5.2]
  def change
    add_column :courses, :ancestry, :string
    add_index :courses, :ancestry
  end
end
