module Secured
  extend ActiveSupport::Concern

  included do
    before_action :logged_in_using_omniauth?
  end

  def current_user
    session[:userinfo] && User.find_by(email: session[:userinfo].dig('extra', 'raw_info', 'email'))
  end

  def logged_in_using_omniauth?
    redirect_to root_url unless current_user
  end
end
