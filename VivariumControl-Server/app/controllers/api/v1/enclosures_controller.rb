class Api::V1::EnclosuresController < ApplicationController
  before_action :set_enclosure, only: [:show, :update, :destroy]

  # GET /api/v1/enclosures
  def index
    @enclosures = Enclosure.all
    render json: @enclosures
  end

  # GET /api/v1/enclosures/:id
  def show
    enclosure = Enclosure.find(params[:id])
    render json: {
      id: enclosure.id,
      name: enclosure.name,
      target_temperature: enclosure.target_temperature,
      created_at: enclosure.created_at,
      updated_at: enclosure.updated_at
    }
  end

  # POST /api/v1/enclosures
  def create
    @enclosure = Enclosure.new(enclosure_params)

    if @enclosure.save
      render json: @enclosure, status: :created, location: api_v1_enclosure_url(@enclosure)
    else
      render json: @enclosure.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/enclosures/:id
  def update
    if @enclosure.update(enclosure_params)
      render json: @enclosure
    else
      render json: @enclosure.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/enclosures/:id
  def destroy
    @enclosure.destroy
  end

  # ESP32 /api/v1/esp32
  def esp32
    response = Enclosure.all.collect do |enclosure| 
      sensors_data = enclosure.sensors.collect do |sensor|
        { sensor_id: sensor.sensor_id, type: sensor.type }
      end
      {
        enclosure_name: enclosure.name,
        target_temperature: enclosure.target_temperature,
        sensors: sensors_data
      }
    end

    render json: response
  end

  private

  def set_enclosure
    @enclosure = Enclosure.find(params[:id])
  end

  def enclosure_params
    params.require(:enclosure).permit(:name, :target_temperature, :other_attributes)
  end
end