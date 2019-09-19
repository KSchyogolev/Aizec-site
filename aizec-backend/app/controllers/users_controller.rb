class UsersController < ApplicationController
  include ArchivableController
  include ReceivableController

  before_action :set_user, only: [:show, :update, :destroy, :approve]
  before_action only: [:update] do
    allow_owner(params[:id])
  end
  before_action :allow_admin, only: [:create, :destroy, :approve]

  wrap_parameters :user, include: [:password, :password_confirmation, :first_name, :level, :second_name, :third_name, :role, :photo, :bio, :phone, :email, :status, :bonus_count, :gender, :address, :birthday, :parents]
  
  has_many_methods_for User
  
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

  def create_by_email
    @user = User.new(params.require(:user).permit(:email))
    generated_password = Devise.friendly_token.first(10)
    @user.password = generated_password
    @user.role = "user"
    if @user.save
      UserMailer.with(user: @user, password: generated_password).activate_email.deliver_later!
      render :show, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def activate
    @user = current_user
    changed_status = user_params
    changed_status[:status] = "not_approved"
    if @user.update(changed_status)
      render :show, status: :ok, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end


  def inbox_all
    id = params[:id] || current_user.id
    return false unless id.present?
    user = User.unscoped.find(id)
    @messages = [
        user.groups, 
        user.clubs,
        user.courses
      ].flatten.map{ |receivable| receivable.received_messages } + Message.where(to_entity_type: 'all')

    if params[:message_kind].present?
      @messages = @messages.map{ |receivable| receivable.where(kind: params[:message_kind]) }  
    end
    @messages = @messages.flatten
    render :template => "messages/index", formats: [:json]
  end

  def outbox
    id = params[:id] || current_user.id
    return false unless id.present?
    user = User.unscoped.find(id)
    @messages = user.sent
    
    render :template => "messages/index", formats: [:json]
  end


  def approve
    @user.status = "active"

    if @user.save
      UserMailer.with(user: @user).approve_email.deliver_later!
      render :show, status: :ok, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def offers
    id = params[:id] || current_user.id
    return false unless id.present?
    user = User.unscoped.find(id)
    relevant_course = Course.get_relevant_to_user(user)
    messages = [
        user.groups, 
        user.clubs,
        user.courses
      ].flatten.map{ |receivable| receivable.received_messages.where(kind: 'offer') } + 
      Message.where(to_entity_type: 'all', kind: 'offer')
    @render_entities = (messages.flatten + relevant_course).sort_by(&:created_at)
  end

  def relevant_courses
    id = params[:id] || current_user.id
    return false unless id.present?
    user = User.unscoped.find(id)
    relevant_course = Course.get_relevant_to_user(user)
    @courses = relevant_course.sort_by(&:created_at)
    render :template => "courses/index", formats: [:json]
  end

  def clubs
    id = params[:id] || current_user.id
    return false unless id.present?
    user = User.unscoped.find(id)
    @clubs = user.clubs
    render :template => "clubs/index", formats: [:json]
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
      @user = User.unscoped.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:password, :password_confirmation, :first_name, :second_name, :third_name, :role, :photo, :bio, :phone, :email, :status, :bonus_count, :gender, :address, :birthday, :parents, :level, :photo)
    end
end
