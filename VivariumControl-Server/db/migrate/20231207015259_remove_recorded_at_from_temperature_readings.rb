class RemoveRecordedAtFromTemperatureReadings < ActiveRecord::Migration[6.0]
  def change
    remove_column :temperature_readings, :recorded_at, :datetime
  end
end
