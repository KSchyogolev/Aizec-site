module Receivable extend ActiveSupport::Concern

  def messages
    Message.where(to_entity_type: name.underscore).where(to_entity_id: id)
  end
end