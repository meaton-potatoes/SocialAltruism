class Api::UsersController < ApplicationController
  include Secured

  skip_before_action :logged_in_using_omniauth?, only: [:show, :leaderboard]

  skip_before_action :verify_authenticity_token, only: [:update]

  def show
    @user = User.find_by(resource_id: params[:id])
    if !@user
      return render json: {message: 'User not found', success: false}, status: 404
    elsif @user.privacy_level == 'users' && !current_user
      return render json: {message: 'You must be logged in to view this profile.', success: false}, status: 403
    elsif @user.privacy_level == 'friends'
      # implement later
    elsif @user.privacy_level == 'only_me' && @user != current_user
      return render json: {message: 'You don\'t have permission to view this profile.', success: false}, status: 403
    end
  end

  # def edit
  #   @user = User.find_by(resource_id: params[:id])
  #   unless @user && @user == current_user
  #     flash[:alert] = 'You don\'t have permission to view this page.'
  #     redirect_to root_path and return
  #   end
  # end

  def update
    if current_user.update_attributes(user_params)
      return render json: {message: 'Your profile successfully updated', success: true}
    end

    render json: {message: current_user.errors.full_messages, success: false}
  end

  def leaderboard
    date = params[:date] ? Date.parse(params[:date]) : DateTime.now.utc

    return render json: {
      date: date,
      ranked_users: LeaderboardHelper.get_leaderboard(date)
    }, status: :ok
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :nickname, :monthly_goal, :privacy_level)
  end
end
