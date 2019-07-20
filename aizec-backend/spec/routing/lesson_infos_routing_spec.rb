require "rails_helper"

RSpec.describe LessonInfosController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/lesson_infos").to route_to("lesson_infos#index")
    end

    it "routes to #show" do
      expect(:get => "/lesson_infos/1").to route_to("lesson_infos#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/lesson_infos").to route_to("lesson_infos#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/lesson_infos/1").to route_to("lesson_infos#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/lesson_infos/1").to route_to("lesson_infos#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/lesson_infos/1").to route_to("lesson_infos#destroy", :id => "1")
    end
  end
end
