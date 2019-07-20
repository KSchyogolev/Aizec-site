require "rails_helper"

RSpec.describe MessageOptionsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/message_options").to route_to("message_options#index")
    end

    it "routes to #show" do
      expect(:get => "/message_options/1").to route_to("message_options#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/message_options").to route_to("message_options#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/message_options/1").to route_to("message_options#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/message_options/1").to route_to("message_options#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/message_options/1").to route_to("message_options#destroy", :id => "1")
    end
  end
end
