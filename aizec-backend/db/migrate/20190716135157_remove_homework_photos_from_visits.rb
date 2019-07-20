class RemoveHomeworkPhotosFromVisits < ActiveRecord::Migration[5.2]
  def change
    remove_column :visits, :homework_photos, :string
  end
end
