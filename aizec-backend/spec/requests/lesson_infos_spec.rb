require 'rails_helper'

RSpec.describe "LessonInfos", type: :request do
  describe "GET /lesson_infos" do
    it "works! (now write some real specs)" do
      get lesson_infos_path
      expect(response).to have_http_status(200)
    end
  end
end
