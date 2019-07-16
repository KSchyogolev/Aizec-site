class AddFieldsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :third_name, :string
    add_column :users, :parent_first_name, :string
    add_column :users, :parent_second_name, :string
    add_column :users, :parent_third_name, :string
    add_column :users, :status, :string
    add_column :users, :bonus_count, :integer
    add_column :users, :parent_relationship, :string
    add_column :users, :gender, :boolean
    add_column :users, :address, :string
    add_column :users, :identifier_type, :string
    add_column :users, :identifier_number, :string
  end
end
