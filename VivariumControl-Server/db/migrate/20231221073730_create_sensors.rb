class CreateSensors < ActiveRecord::Migration[7.1]
  def change
    create_table :sensors do |t|
      t.integer :sensor_id
      t.integer :type
      t.references :enclosure, null: false, foreign_key: true

      t.timestamps
    end
  end
end
