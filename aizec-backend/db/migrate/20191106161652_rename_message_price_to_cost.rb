class RenameMessagePriceToCost < ActiveRecord::Migration[5.2]
  def change
    rename_column :messages, :price, :cost
  end
end
