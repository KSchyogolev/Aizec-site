class UserGroupsController < ApplicationController
  include ArchivableController
  
  before_action :set_user_group, only: [:show, :update, :destroy]

  # GET /user_groups
  # GET /user_groups.json
  def index
    @user_groups = UserGroup.all
  end

  # GET /user_groups/1
  # GET /user_groups/1.json
  def show
  end

  # POST /user_groups
  # POST /user_groups.json
  def create
    @user_group = UserGroup.new(user_group_params)

    if @user_group.save
      render :show, status: :created, location: @user_group
    else
      render json: @user_group.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_groups/1
  # PATCH/PUT /user_groups/1.json
  def update
    if @user_group.update(user_group_params)
      render :show, status: :ok, location: @user_group
    else
      render json: @user_group.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_groups/1
  # DELETE /user_groups/1.json
  def destroy
    @user_group.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_group
      @user_group = UserGroup.unscoped.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_group_params
      params.require(:user_group).permit(:payment_date, :status, :user_id, :group_id)
    end
end
