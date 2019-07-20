class CreateUserMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :user_messages do |t|
      t.integer :chosen_option
      t.string :status
      t.references :user, foreign_key: true, null: false
      t.references :message, foreign_key: true, null: false

      t.timestamps
    end
  end
end
