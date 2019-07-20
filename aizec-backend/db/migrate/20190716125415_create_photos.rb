class CreatePhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :name
      t.string :path
      t.references :message, foreign_key: true, null: false

      t.timestamps
    end
  end
end
