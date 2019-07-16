require 'rails_helper'

RSpec.describe "LessonTypes", type: :request do
  describe "GET /lesson_types" do
    it "works! (now write some real specs)" do
      get lesson_types_path
      expect(response).to have_http_status(200)
    end
  end
end
