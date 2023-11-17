class HomeController < ApplicationController
  skip_before_action :authenticate_user, only: [:index]
  def index
    @brands =  Brand.all
    render json: "wellcom to Thomas's App"
  end
end