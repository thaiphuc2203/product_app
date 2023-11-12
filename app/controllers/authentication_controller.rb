class AuthenticationController < ApplicationController
  skip_before_action :authenticate_user, only: [:login]
  def login
    @user = User.find_by!(email: login_params[:email])
    if @user.authenticate(login_params[:password])
      @token = JsonWebTokenService.encode({ email: @user.email })
      render json: {
        user: @user,
        authe_token: @token
      }, status: :accepted
    else
      render json: { message: 'Incorrect password' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:email, :password)
  end
end
