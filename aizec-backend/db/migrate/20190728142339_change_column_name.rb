class ChangeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :messages, :type, :kind
    rename_column :courses, :type, :kind
  end
end
