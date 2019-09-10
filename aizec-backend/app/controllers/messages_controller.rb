class MessagesController < ApplicationController
  include ArchivableController

  before_action :set_message, only: [:show, :update, :destroy]

  # GET /messages
  # GET /messages.json
  def index
    @messages = Message.all
  end

  # GET /messages/1
  # GET /messages/1.json
  def show
  end

  # POST /messages
  # POST /messages.json
  def create
    @message = Message.new(message_params)

    if @message.save
      if @message.kind == "homework" and @message.to_entity_type == "visit"
        visit = Visit.find(@message.to_entity_id)
        if visit.present?
          visit.approve_status ||= "done_not_approved"
          visit.save
        end
      end
      UserMailer.with(message: @message).check_message.deliver_later
      render :show, status: :created, location: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /messages/1
  # PATCH/PUT /messages/1.json
  def update
    if @message.update(message_params)
      render :show, status: :ok, location: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def message_params
      params.require(:message).permit(:kind, :status, :user_id, :to_entity_type, :to_entity_id, :head_text, :full_text, photos: [])
    end
end
