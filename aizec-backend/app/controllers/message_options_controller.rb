class MessageOptionsController < ApplicationController
  before_action :set_message_option, only: [:show, :update, :destroy]

  # GET /message_options
  # GET /message_options.json
  def index
    @message_options = MessageOption.all
  end

  # GET /message_options/1
  # GET /message_options/1.json
  def show
  end

  # POST /message_options
  # POST /message_options.json
  def create
    @message_option = MessageOption.new(message_option_params)

    if @message_option.save
      render :show, status: :created, location: @message_option
    else
      render json: @message_option.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /message_options/1
  # PATCH/PUT /message_options/1.json
  def update
    if @message_option.update(message_option_params)
      render :show, status: :ok, location: @message_option
    else
      render json: @message_option.errors, status: :unprocessable_entity
    end
  end

  # DELETE /message_options/1
  # DELETE /message_options/1.json
  def destroy
    @message_option.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message_option
      @message_option = MessageOption.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def message_option_params
      params.require(:message_option).permit(:name, :index, :message_id)
    end
end
