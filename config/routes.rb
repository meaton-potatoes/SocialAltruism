Rails.application.routes.draw do
  root to: 'static#root'

  namespace :api, constraints: { format: 'json' } do
    get 'donations/stats' => 'donations#stats'
    resources :donations, only: [:show]
    resources :organizations do
      resources :donations, only: [:create]
    end
    resources :users
    get 'leaderboard' => 'users#leaderboard'
  end

  get '*path', to: 'static#root'
  # get 'about' => 'static#about'

  # get 'auth/auth0/callback' => 'auth0#callback'
  # get 'auth/failure' => 'auth0#failure'
  # get 'auth/logout' => 'logout#logout'
end
