module Receivable extend ActiveSupport::Concern

  def received_messages
    Message.where(to_entity_type: self.class.name.underscore).where(to_entity_id: id)
  end
end