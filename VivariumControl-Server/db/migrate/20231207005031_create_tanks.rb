class CreateEnclosures < ActiveRecord::Migration[7.1]
  def change
    create_table :enclosures do |t|
      t.string :name

      t.timestamps
    end
  end
end
