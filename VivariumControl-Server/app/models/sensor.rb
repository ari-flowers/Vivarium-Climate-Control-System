class Sensor < ApplicationRecord
  belongs_to :enclosure

  enum type: {
    cool: 0,
    hot: 1,
    element: 2
  }
end
