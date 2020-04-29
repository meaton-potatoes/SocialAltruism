class Auth0Controller < ApplicationController
  def callback
    # This stores all the user information that came from Auth0
    # and the IdP
    session[:userinfo] = request.env['omniauth.auth']
    User.find_or_initialize_by(email: session[:userinfo].dig('extra', 'raw_info', 'email')).tap do |user|
      user.first_name = session[:userinfo].dig('extra', 'raw_info', 'given_name')
      user.last_name = session[:userinfo].dig('extra', 'raw_info', 'family_name')
      user.save
    end

    # Redirect to the URL you want after successful auth
    redirect_to root_path
  end

  def failure
    # show a failure page or redirect to an error page
    @error_msg = request.params['message']
  end
end
