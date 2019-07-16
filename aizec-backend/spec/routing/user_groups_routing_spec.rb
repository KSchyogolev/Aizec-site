require "rails_helper"

RSpec.describe UserGroupsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/user_groups").to route_to("user_groups#index")
    end

    it "routes to #show" do
      expect(:get => "/user_groups/1").to route_to("user_groups#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/user_groups").to route_to("user_groups#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/user_groups/1").to route_to("user_groups#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/user_groups/1").to route_to("user_groups#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/user_groups/1").to route_to("user_groups#destroy", :id => "1")
    end
  end
end
