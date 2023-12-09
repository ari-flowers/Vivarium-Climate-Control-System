class CreateTemperatureReadings < ActiveRecord::Migration[7.1]
  def change
    create_table :temperature_readings do |t|
      t.references :enclosure, null: false, foreign_key: true
      t.float :temperature
      t.string :reading_type
      t.datetime :recorded_at

      t.timestamps
    end
  end
end
