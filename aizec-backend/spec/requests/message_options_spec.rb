require 'rails_helper'

RSpec.describe "MessageOptions", type: :request do
  describe "GET /message_options" do
    it "works! (now write some real specs)" do
      get message_options_path
      expect(response).to have_http_status(200)
    end
  end
end
