class LessonTypesController < ApplicationController
  before_action :set_lesson_type, only: [:show, :update, :destroy]

  # GET /lesson_types
  # GET /lesson_types.json
  def index
    @lesson_types = LessonType.all
  end

  # GET /lesson_types/1
  # GET /lesson_types/1.json
  def show
  end

  # POST /lesson_types
  # POST /lesson_types.json
  def create
    @lesson_type = LessonType.new(lesson_type_params)

    if @lesson_type.save
      render :show, status: :created, location: @lesson_type
    else
      render json: @lesson_type.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lesson_types/1
  # PATCH/PUT /lesson_types/1.json
  def update
    if @lesson_type.update(lesson_type_params)
      render :show, status: :ok, location: @lesson_type
    else
      render json: @lesson_type.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lesson_types/1
  # DELETE /lesson_types/1.json
  def destroy
    @lesson_type.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lesson_type
      @lesson_type = LessonType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lesson_type_params
      params.require(:lesson_type).permit(:name)
    end
end
