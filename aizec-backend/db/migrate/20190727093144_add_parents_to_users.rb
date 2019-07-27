class AddParentsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :parents, :string
    add_column :users, :birthday, :date
    remove_column :users, :parent_first_name, :string
    remove_column :users, :parent_second_name, :string
    remove_column :users, :parent_third_name, :string
    remove_column :users, :parent_relationship, :string
    remove_column :users, :identifier_type, :string
    remove_column :users, :identifier_number, :string
  end
end
