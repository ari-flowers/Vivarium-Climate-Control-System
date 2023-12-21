class AddTargetTemperatureToEnclosures < ActiveRecord::Migration[7.1]
  def change
    add_column :enclosures, :target_temperature, :float
  end
end
