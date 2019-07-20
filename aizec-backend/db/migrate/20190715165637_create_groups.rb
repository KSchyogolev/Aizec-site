class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :name
      t.string :status, :default => "active"
      t.references :club, foreign_key: true
      t.references :course, foreign_key: true

      t.timestamps
    end
  end
end
