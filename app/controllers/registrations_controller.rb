class RegistrationsController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]
  def create
    @user = User.new(user_params)
    user_params['role'] = 'client'
    if @user.save
      render json: {
        user: @user
      }, status: :created
    else
      render json: { error: 'Please verify email address' }
    end
  end

  def me
    render json: current_user, status: :ok
  end

  private

  def user_params
    params.require(:users).permit(:email, :password)
    # params.require(:users).permit(:name, :email, :password, :password_confirmation)
  end
end
