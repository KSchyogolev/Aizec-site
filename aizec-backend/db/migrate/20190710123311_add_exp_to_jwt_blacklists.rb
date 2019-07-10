class AddExpToJwtBlacklists < ActiveRecord::Migration[5.2]
  def change
    add_column :jwt_blacklists, :exp, :datetime
  end
end
