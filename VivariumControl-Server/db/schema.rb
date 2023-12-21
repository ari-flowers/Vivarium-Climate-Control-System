# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_12_21_083048) do
  create_table "enclosures", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "target_temperature", default: 86.0
  end

  create_table "sensors", force: :cascade do |t|
    t.integer "sensor_id"
    t.integer "type"
    t.integer "enclosure_id", null: false
    t.index ["enclosure_id"], name: "index_sensors_on_enclosure_id"
    t.index ["sensor_id"], name: "index_sensors_on_sensor_id", unique: true
  end

  create_table "temperature_readings", force: :cascade do |t|
    t.integer "enclosure_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "hot_side_temp"
    t.float "cool_side_temp"
    t.float "element_temp"
    t.index ["enclosure_id"], name: "index_temperature_readings_on_enclosure_id"
  end

  add_foreign_key "sensors", "enclosures"
  add_foreign_key "temperature_readings", "enclosures"
end
