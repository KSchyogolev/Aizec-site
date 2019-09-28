class AddPriceToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :price, :integer
  end
end
