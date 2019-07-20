module ArchivableController extend ActiveSupport::Concern

  # included do
  #   
  # end

  def archivated_index
    allow_admin
    resource_model = controller_name.classify.constantize
    plural_var = controller_name
    instance_variable_set("@#{plural_var}", resource_model.unscoped.where(status: "archived"))
    render :index
  end

  def with_archivated_index
    allow_admin
    resource_model = controller_name.classify.constantize
    plural_var = controller_name
    instance_variable_set("@#{plural_var}", resource_model.unscoped.all)
    render :index
  end

  def archivated_show
    allow_admin
    resource_model = controller_name.classify.constantize
    singular_var = controller_name.singularize
    instance_variable_set("@#{singular_var}", resource_model.unscoped.find(params[:id]))
    render :show
  end
end