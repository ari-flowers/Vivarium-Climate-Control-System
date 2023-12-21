class UpdateTemperatureReadings < ActiveRecord::Migration[7.1]
  def change
    remove_column :temperature_readings, :temperature, :float
    remove_column :temperature_readings, :reading_type, :string

    add_column :temperature_readings, :hot_side_temp, :float
    add_column :temperature_readings, :cool_side_temp, :float
    add_column :temperature_readings, :element_temp, :float
  end
end
