class UsersController < ApplicationController
  include Secured

  def show
    @user = User.find_by(resource_id: params[:id])
  end

  def edit; end

  def update
    if current_user.update_attributes(user_params)
      flash[:success] = 'Your profile was successfully updated'
    end

    redirect_to user_path(current_user.resource_id)
  end

  private
  def user_params
    params.require(:user).permit(:nickname)
  end
end
