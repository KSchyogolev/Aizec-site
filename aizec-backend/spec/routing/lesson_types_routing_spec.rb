require "rails_helper"

RSpec.describe LessonTypesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/lesson_types").to route_to("lesson_types#index")
    end

    it "routes to #show" do
      expect(:get => "/lesson_types/1").to route_to("lesson_types#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/lesson_types").to route_to("lesson_types#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/lesson_types/1").to route_to("lesson_types#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/lesson_types/1").to route_to("lesson_types#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/lesson_types/1").to route_to("lesson_types#destroy", :id => "1")
    end
  end
end
