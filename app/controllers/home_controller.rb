class HomeController < ApplicationController
  skip_before_action :authenticate_user, only: [:index]
  def index
    render json: 'welcome Thomas, this is difficult journey, but i believe that you will handle everything'
  end
end
