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
    unless current_user.present?
      head :unauthorized
    end
  end

  def allow_admin
    pp current_user&.admin?
    unless current_user&.admin?
      head :forbidden
    end
  end

  def allow_teacher
    unless current_user&.teacher?
      head :forbidden
    end
  end

  def allow_owner(entity_user_id)
    unless current_user&.admin? or current_user&.id == entity_user_id
      head :forbidden
    end
  end

  def self.has_many_methods_for model
    model.reflect_on_all_associations.each do |assoc|
      if assoc.is_a? ActiveRecord::Reflection::HasManyReflection or assoc.is_a? ActiveRecord::Reflection::ThroughReflection
        define_method("add_#{assoc.plural_name.singularize}") do 
          model.find(params[:id]).send(assoc.plural_name) << assoc.klass.find(params["#{assoc.plural_name.singularize}_id"])
          render :show, status: :ok, location: model.find(params[:id])
        end

        define_method("remove_#{assoc.plural_name.singularize}") do 
          if assoc.plural_name.end_with? "attachments"
            model.find(params[:id]).send(assoc.plural_name)[params["#{assoc.plural_name.singularize}_id"].to_i].purge
          else 
            model.find(params[:id]).send(assoc.plural_name).delete(params["#{assoc.plural_name.singularize}_id"])
          end
        end

        define_method(assoc.plural_name) do
          instance_variable_set("@" + assoc.plural_name, model.find(params[:id]).send(assoc.plural_name))
          render :template => "#{assoc.plural_name}/index", formats: [:json]
        end
      end
    end
  end
end
