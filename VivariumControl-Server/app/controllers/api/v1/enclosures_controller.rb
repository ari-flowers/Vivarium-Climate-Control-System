class Api::V1::EnclosuresController < ApplicationController
  before_action :set_enclosure, only: [:show, :update, :destroy]

  # GET /api/v1/enclosures
  def index
    @enclosures = Enclosure.all
    render json: @enclosures
  end

  # GET /api/v1/enclosures/:id
  def show
    render json: @enclosure
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

  private

  def set_enclosure
    @enclosure = Enclosure.find(params[:id])
  end

  def enclosure_params
    # Add any other parameters you need
    params.require(:enclosure).permit(:name, :other_attributes)
  end
end