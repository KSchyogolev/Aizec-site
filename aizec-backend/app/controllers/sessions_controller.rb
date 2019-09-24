class SessionsController < Devise::SessionsController
  respond_to :json
  wrap_parameters :user, include: [:password, :password_confirmation, :email]

  private

  def respond_with(resource, _opts = {})
    #render json: resource
    @user = resource
    render :template => "users/show", formats: [:json]
  end

  def respond_to_on_destroy
    head :no_content
  end
end
