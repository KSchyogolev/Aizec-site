class PaymentsController < ApplicationController
  include ArchivableController
  
  before_action :set_payment, only: [:show, :update, :destroy]

  # GET /payments
  # GET /payments.json
  def index
    @payments = Payment.all
  end

  # GET /payments/1
  # GET /payments/1.json
  def show
  end

  # POST /payments
  # POST /payments.json
  def create
    @payment = Payment.new(payment_params)

    if @payment.save
      render :show, status: :created, location: @payment
    else
      render json: @payment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /payments/1
  # PATCH/PUT /payments/1.json
  def update
    if @payment.update(payment_params)
      render :show, status: :ok, location: @payment
    else
      render json: @payment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /payments/1
  # DELETE /payments/1.json
  def destroy
    @payment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_payment
      @payment = Payment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def payment_params
      params.require(:payment).permit(:bonuses, :cost, :status, :user_id, :course_id, :merch_id, :message_id)
    end
end
