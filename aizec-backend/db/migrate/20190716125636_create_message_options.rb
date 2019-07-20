class CreateMessageOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :message_options do |t|
      t.string :name
      t.integer :index
      t.references :message, foreign_key: true, null: false

      t.timestamps
    end
  end
end
