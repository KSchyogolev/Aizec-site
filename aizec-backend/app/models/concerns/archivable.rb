module Archivable extend ActiveSupport::Concern

  included do
    default_scope { where.not(status: "archived") }
  end

  def archived? 
    status == "archived"
  end
end