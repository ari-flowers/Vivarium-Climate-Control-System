class RenameTankIdToEnclosureIdInTemperatureReadings < ActiveRecord::Migration[7.1]
  def change
    rename_column :temperature_readings, :tank_id, :enclosure_id
  end
end