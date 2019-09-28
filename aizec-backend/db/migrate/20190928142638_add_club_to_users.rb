class AddClubToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :club, :string
  end
end
