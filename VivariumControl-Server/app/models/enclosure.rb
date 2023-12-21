class Enclosure < ApplicationRecord
  has_many :temperature_readings
  has_many :sensors
end
