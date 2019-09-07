module ReceivableController extend ActiveSupport::Concern

  def messages
    resource_model = controller_name.classify.constantize
    @messages = resource_model.find(params[:id]).received_messages
    render :template => "messages/index", formats: [:json]
  end
end