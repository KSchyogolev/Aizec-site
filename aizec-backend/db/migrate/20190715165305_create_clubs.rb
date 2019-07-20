class CreateClubs < ActiveRecord::Migration[5.2]
  def change
    create_table :clubs do |t|
      t.string :name
      t.string :status, :default => "active"
      t.string :address

      t.timestamps
    end
  end
end
