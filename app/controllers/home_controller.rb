class HomeController < ApplicationController
  def index
    @brands =  Brand.all
    render json: @brands
  end
end