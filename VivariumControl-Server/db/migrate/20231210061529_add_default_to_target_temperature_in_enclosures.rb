class AddDefaultToTargetTemperatureInEnclosures < ActiveRecord::Migration[7.1]
  def change
    change_column_default :enclosures, :target_temperature, from: nil, to: 86
  end
end
