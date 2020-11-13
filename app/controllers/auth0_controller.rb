class Auth0Controller < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:callback]
  
  def callback
    # This stores all the user information that came from Auth0
    # and the IdP
    session[:userinfo] = request.env['omniauth.auth']
    User.find_or_create_by!(email: session[:userinfo].dig('extra', 'raw_info', 'email'))

    # Redirect to the URL you want after successful auth
    redirect_to root_path
  end

  def failure
    # show a failure page or redirect to an error page
    @error_msg = request.params['message']
  end
end
