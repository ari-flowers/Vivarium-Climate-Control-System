class TemperatureReading < ApplicationRecord
  belongs_to :enclosure
  validates :hot_side_temp, :cool_side_temp, :element_temp, presence: true, numericality: true
end
