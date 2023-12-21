class RemoveTimestampsFromSensors < ActiveRecord::Migration[7.1]
  def change
    remove_column :sensors, :created_at, :datetime
    remove_column :sensors, :updated_at, :datetime 
  end
end
