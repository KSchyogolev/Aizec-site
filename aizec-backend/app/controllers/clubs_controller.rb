class ClubsController < ApplicationController
  include ArchivableController

  before_action :set_club, only: [:show, :update, :destroy]

  has_many_methods_for Club
  
  # GET /clubs
  # GET /clubs.json
  def index
    @clubs = Club.all
  end

  # GET /clubs/1
  # GET /clubs/1.json
  def show
  end

  # POST /clubs
  # POST /clubs.json
  def create
    @club = Club.new(club_params)

    if @club.save
      render :show, status: :created, location: @club
    else
      render json: @club.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /clubs/1
  # PATCH/PUT /clubs/1.json
  def update
    if @club.update(club_params)
      render :show, status: :ok, location: @club
    else
      render json: @club.errors, status: :unprocessable_entity
    end
  end

  # DELETE /clubs/1
  # DELETE /clubs/1.json
  def destroy
    @club.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_club
      @club = Club.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def club_params
      params.require(:club).permit(:name, :status, :address)
    end
end
