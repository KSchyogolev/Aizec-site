class CreatePayments < ActiveRecord::Migration[5.2]
  def change
    create_table :payments do |t|
      t.integer :bonuses
      t.integer :cost
      t.string :status
      t.references :user, foreign_key: true, null: false
      t.references :course, foreign_key: true
      t.references :merch, foreign_key: true

      t.timestamps
    end
  end
end
