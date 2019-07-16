class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :type
      t.string :status, :default => "not_readen"
      t.references :user, foreign_key: true, null: false
      t.string :to_entity_type
      t.integer :to_entity_id
      t.string :head_text
      t.string :full_text

      t.timestamps
    end
  end
end
