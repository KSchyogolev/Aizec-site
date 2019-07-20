require "rails_helper"

RSpec.describe MerchesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/merches").to route_to("merches#index")
    end

    it "routes to #show" do
      expect(:get => "/merches/1").to route_to("merches#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/merches").to route_to("merches#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/merches/1").to route_to("merches#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/merches/1").to route_to("merches#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/merches/1").to route_to("merches#destroy", :id => "1")
    end
  end
end
