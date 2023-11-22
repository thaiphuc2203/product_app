class HomeController < ApplicationController
  skip_before_action :authenticate_user, only: [:index]
  def index
    @brands =  Brand.all
    render json: "welcome thomas's App"
  end
end