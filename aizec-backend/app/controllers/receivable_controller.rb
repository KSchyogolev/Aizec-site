module ReceivableController extend ActiveSupport::Concern

  def inbox
    resource_model = controller_name.classify.constantize
    @messages = resource_model.find(params[:id]).received_messages

    if params[:message_kind].present?
      @messages = @messages.where(kind: params[:message_kind])
    end

    render :template => "messages/index", formats: [:json]
  end
end