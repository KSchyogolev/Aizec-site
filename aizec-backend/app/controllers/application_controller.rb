class ApplicationController < ActionController::API
  respond_to :json
  def render_resource(resource)
    if resource.errors.empty?
      render json: resource
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: {
      errors: [
        {
          status: '400',
          title: 'Bad Request',
          detail: resource.errors,
          code: '100'
        }
      ]
    }, status: :bad_request
  end

  def allow_authorized
    unless @current_user.present?
      head :unauthorized
    end
  end

  def allow_admin
    unless @current_user&.admin?
      head :forbidden
    end
  end

  def allow_teacher
    unless @current_user&.teacher?
      head :forbidden
    end
  end

  def allow_current_user(entity_user_id)
    unless @current_user&.admin? or @current_user&.id == entity_user_id
      head :forbidden
    end
  end
end
