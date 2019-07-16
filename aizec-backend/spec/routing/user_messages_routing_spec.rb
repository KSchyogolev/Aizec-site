require "rails_helper"

RSpec.describe UserMessagesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/user_messages").to route_to("user_messages#index")
    end

    it "routes to #show" do
      expect(:get => "/user_messages/1").to route_to("user_messages#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/user_messages").to route_to("user_messages#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/user_messages/1").to route_to("user_messages#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/user_messages/1").to route_to("user_messages#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/user_messages/1").to route_to("user_messages#destroy", :id => "1")
    end
  end
end
