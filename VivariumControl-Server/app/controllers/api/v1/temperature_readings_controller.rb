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
    render json: @temperature_reading
  end

  # POST /enclosures/:enclosure_id/temperature_readings
  def create
    @temperature_reading = @enclosure.temperature_readings.new(temperature_reading_params)

    if @temperature_reading.save
      render json: @temperature_reading, status: :created, location: api_v1_enclosure_temperature_reading_url(@enclosure, @temperature_reading)
    else
      render json: @temperature_reading.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /enclosures/:enclosure_id/temperature_readings/:id
  def update
    if @temperature_reading.update(temperature_reading_params)
      render json: @temperature_reading
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
    params.require(:temperature_reading).permit(:temperature, :reading_type)
  end
end