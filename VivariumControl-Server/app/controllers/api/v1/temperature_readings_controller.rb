class Api::V1::TemperatureReadingsController < ApplicationController
  before_action :set_enclosure
  before_action :set_temperature_reading, only: [:show, :update, :destroy]

  # GET /enclosures/:enclosure_id/temperature_readings
  def index
    @temperature_readings = @enclosure.temperature_readings
    render json: @temperature_readings
  end

  # GET /enclosures/:enclosure_id/temperature_readings/:id
  def show
    render json: {
      id: @temperature_reading.id,
      enclosure_id: @temperature_reading.enclosure_id,
      hot_side_temp: @temperature_reading.hot_side_temp,
      cool_side_temp: @temperature_reading.cool_side_temp,
      element_temp: @temperature_reading.element_temp
  }
  end

  # POST /enclosures/:enclosure_id/temperature_readings
  def create
    @temperature_reading = @enclosure.temperature_readings.new(temperature_reading_params)

    if @temperature_reading.save
      render json: {
        id: @temperature_reading.id,
        enclosure_id: @temperature_reading.enclosure_id,
        hot_side_temp: @temperature_reading.hot_side_temp,
        cool_side_temp: @temperature_reading.cool_side_temp,
        element_temp: @temperature_reading.element_temp
        # Include other fields if necessary
      }, status: :created
    else
      render json: @temperature_reading.errors, status: :unprocessable_entity
    end
  end

 # PATCH/PUT /enclosures/:enclosure_id/temperature_readings/:id
  def update
    if @temperature_reading.update(temperature_reading_params)
      render json: {
        id: @temperature_reading.id,
        enclosure_id: @temperature_reading.enclosure_id,
        hot_side_temp: @temperature_reading.hot_side_temp,
        cool_side_temp: @temperature_reading.cool_side_temp,
        element_temp: @temperature_reading.element_temp
        # Include other fields if necessary
      }
    else
      render json: @temperature_reading.errors, status: :unprocessable_entity
    end
  end

  # DELETE /enclosures/:enclosure_id/temperature_readings/:id
  def destroy
    @temperature_reading.destroy
  end

  private

  def set_enclosure
    @enclosure = Enclosure.find(params[:enclosure_id])
  end

  def set_temperature_reading
    @temperature_reading = @enclosure.temperature_readings.find(params[:id])
  end

  def temperature_reading_params
    params.require(:temperature_reading).permit(:hot_side_temp, :cool_side_temp, :element_temp)
  end
end