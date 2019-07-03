class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :index]
  before_filter :is_admin, only: [:index]
  wrap_parameters :user, include: [:password, :password_confirmation, :first_name, :second_name, :role, :photo, :bio, :phone, :email]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    if @user.save
      render :show, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    if @user.update(user_params)
      render :show, status: :ok, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def is_admin
      if @user.role == 'admin'
        return true
      else
        render head :forbidden
        return false
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:password, :password_confirmation, :first_name, :second_name, :role, :photo, :bio, :phone, :email)
    end
end
