module ArchivableController extend ActiveSupport::Concern

  # included do
  #   
  # end

  def archivated_index
    resource_model = controller_name.classify.constantize
    plural_var = controller_name
    instance_variable_set("@#{plural_var}", resource_model.unscoped.where(status: "archived"))
    render :template => "@#{plural_var}/index", formats: [:json]
  end

  def with_archivated_index
    resource_model = controller_name.classify.constantize
    plural_var = controller_name
    instance_variable_set("@#{plural_var}", resource_model.unscoped.all)
    render :template => "@#{plural_var}/index", formats: [:json]
  end

  def archivated_show
    resource_model = controller_name.classify.constantize
    singular_var = controller_name.singularize
    instance_variable_set("@#{singular_var}", resource_model.unscoped.find(params[:id]))
    render :template => "@#{plural_var}/show", formats: [:json]
  end
end