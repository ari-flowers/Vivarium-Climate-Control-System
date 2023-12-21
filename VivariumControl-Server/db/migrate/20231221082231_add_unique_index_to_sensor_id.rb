class AddUniqueIndexToSensorId < ActiveRecord::Migration[7.1]
  def change
    add_index :sensors, :sensor_id, unique: true
  end
end
