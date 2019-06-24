class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :login
      t.string :password_digest
      t.string :first_name
      t.string :second_name
      t.string :role
      t.string :photo
      t.string :bio
      t.string :phone
      t.string :email

      t.timestamps
    end
    add_index :users, :login, unique: true
    add_index :users, :email, unique: true
  end
end
