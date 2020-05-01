class UsersController < ApplicationController
  include Secured

  skip_before_action :logged_in_using_omniauth?, only: [:show, :leaderboard]

  def show
    @user = User.find_by(resource_id: params[:id])
    if !@user
      flash[:alert] = 'User not found'
      redirect_to root_url and return
    elsif @user.privacy_level == 'users'
      unless current_user
        flash[:alert] = 'You must be logged in to view this profile.'
        redirect_to root_url and return
      end
    elsif @user.privacy_level == 'friends'
      # implement later
    elsif @user.privacy_level == 'only_me'
      unless @user == current_user
        flash[:alert] = 'You don\'t have permission to view this profile.'
        redirect_to root_url and return
      end
    end
  end

  def edit
    @user = User.find_by(resource_id: params[:id])
    unless @user && @user == current_user
      flash[:alert] = 'You don\'t have permission to view this page.'
      redirect_to root_path and return
    end
  end

  def update
    if current_user.update_attributes(user_params)
      flash[:success] = 'Your profile was successfully updated'
    end

    redirect_to user_path(current_user.resource_id)
  end

  def leaderboard
    @date = params[:date] ? Date.parse(params[:date]) : DateTime.now.utc
    @ranked_donations = LeaderboardHelper.get_leaderboard(@date)
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :nickname, :monthly_goal, :privacy_level)
  end
end
