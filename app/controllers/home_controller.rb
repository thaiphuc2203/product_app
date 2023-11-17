class HomeController < ApplicationController
  def index
    @brands =  Brand.all
    render json: "wellcom to Thomas's App"
  end
end