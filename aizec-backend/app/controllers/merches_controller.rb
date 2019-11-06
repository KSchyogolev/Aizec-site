class MerchesController < ApplicationController
  before_action :set_merch, only: [:show, :update, :destroy]

  has_many_methods_for Merch

  # GET /merches
  # GET /merches.json
  def index
    @merches = Merch.all
  end

  # GET /merches/1
  # GET /merches/1.json
  def show
  end

  # POST /merches
  # POST /merches.json
  def create
    @merch = Merch.new(merch_params)

    if @merch.save
      render :show, status: :created, location: @merch
    else
      render json: @merch.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /merches/1
  # PATCH/PUT /merches/1.json
  def update
    if @merch.update(merch_params)
      render :show, status: :ok, location: @merch
    else
      render json: @merch.errors, status: :unprocessable_entity
    end
  end

  # DELETE /merches/1
  # DELETE /merches/1.json
  def destroy
    @merch.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_merch
      @merch = Merch.unscoped.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def merch_params
      params.require(:merch).permit(:name, :photo_path, :cost, :short_description, :full_description)
    end
end
