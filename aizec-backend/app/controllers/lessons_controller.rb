class LessonsController < ApplicationController
  include ArchivableController
  
  before_action :set_lesson, only: [:show, :update, :destroy]

  has_many_methods_for Lesson
  
  # GET /lessons
  # GET /lessons.json
  def index
    @lessons = Lesson.all
  end

  # GET /lessons/1
  # GET /lessons/1.json
  def show
  end

  # POST /lessons
  # POST /lessons.json
  def create
    @lesson = Lesson.new(lesson_params)

    if @lesson.save
      render :show, status: :created, location: @lesson
    else
      render json: @lesson.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lessons/1
  # PATCH/PUT /lessons/1.json
  def update
    if @lesson.update(lesson_params)
      render :show, status: :ok, location: @lesson
    else
      render json: @lesson.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lessons/1
  # DELETE /lessons/1.json
  def destroy
    @lesson.destroy
  end

  def by_user
    user_id = params[:user_id] || current_user&.id
    if user_id.present?
      # @visits = User.find(user_id).visits
      @lessons = User.find(user_id).groups.flat_map{ |g| g.lessons }
      render :index, status: :ok
    else
      head :unauthorized
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lesson
      @lesson = Lesson.unscoped.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lesson_params
      params.require(:lesson).permit(:start_time, :group_id, :lesson_info_id, :status)
    end
end
