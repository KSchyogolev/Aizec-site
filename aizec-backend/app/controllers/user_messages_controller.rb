class UserMessagesController < ApplicationController
  before_action :set_user_message, only: [:show, :update, :destroy]

  # GET /user_messages
  # GET /user_messages.json
  def index
    @user_messages = UserMessage.all
  end

  # GET /user_messages/1
  # GET /user_messages/1.json
  def show
  end

  # POST /user_messages
  # POST /user_messages.json
  def create
    @user_message = UserMessage.new(user_message_params)

    if @user_message.save
      render :show, status: :created, location: @user_message
    else
      render json: @user_message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_messages/1
  # PATCH/PUT /user_messages/1.json
  def update
    if @user_message.update(user_message_params)
      render :show, status: :ok, location: @user_message
    else
      render json: @user_message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_messages/1
  # DELETE /user_messages/1.json
  def destroy
    @user_message.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_message
      @user_message = UserMessage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_message_params
      params.require(:user_message).permit(:chosen_option, :status, :user_id, :message_id)
    end
end
