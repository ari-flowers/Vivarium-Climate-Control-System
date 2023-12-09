class RenameEnclosuresToEnclosures < ActiveRecord::Migration[7.1]
  def change
    rename_table :enclosures, :enclosures
  end
end