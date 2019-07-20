class CreateMerches < ActiveRecord::Migration[5.2]
  def change
    create_table :merches do |t|
      t.string :name, null: false
      t.string :photo_path
      t.integer :cost, null: false
      t.string :short_description
      t.string :full_description

      t.timestamps
    end
  end
end
