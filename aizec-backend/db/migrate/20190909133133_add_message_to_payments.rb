class AddMessageToPayments < ActiveRecord::Migration[5.2]
  def change
    add_reference :payments, :message, foreign_key: true
  end
end
