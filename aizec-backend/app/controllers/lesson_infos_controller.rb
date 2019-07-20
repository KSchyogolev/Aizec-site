class LessonInfosController < ApplicationController
  include ArchivableController
  
  before_action :set_lesson_info, only: [:show, :update, :destroy]

  # GET /lesson_infos
  # GET /lesson_infos.json
  def index
    @lesson_infos = LessonInfo.all
  end

  # GET /lesson_infos/1
  # GET /lesson_infos/1.json
  def show
  end

  # POST /lesson_infos
  # POST /lesson_infos.json
  def create
    @lesson_info = LessonInfo.new(lesson_info_params)

    if @lesson_info.save
      render :show, status: :created, location: @lesson_info
    else
      render json: @lesson_info.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lesson_infos/1
  # PATCH/PUT /lesson_infos/1.json
  def update
    if @lesson_info.update(lesson_info_params)
      render :show, status: :ok, location: @lesson_info
    else
      render json: @lesson_info.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lesson_infos/1
  # DELETE /lesson_infos/1.json
  def destroy
    @lesson_info.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lesson_info
      @lesson_info = LessonInfo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lesson_info_params
      params.require(:lesson_info).permit(:short_description, :full_description, :synopsys, :homework, :duration, :status, :course_id, :lesson_type_id)
    end
end
