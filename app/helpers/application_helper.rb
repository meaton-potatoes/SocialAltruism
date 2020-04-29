module ApplicationHelper
  def current_user
    session[:userinfo] && User.find_by(email: session[:userinfo].dig('extra', 'raw_info', 'email'))
  end
end
