class AddExpToJwtBlacklist < ActiveRecord::Migration[5.2]
  def change
    add_column :jwt_blacklist, :exp, :datetime
  end
end
