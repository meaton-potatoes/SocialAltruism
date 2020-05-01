Rails.application.routes.draw do
  root to: 'static#welcome'
  resources :donations
  resources :organizations
  resources :users

  get 'leaderboard' => 'users#leaderboard'
  get 'about' => 'static#about'

  get 'auth/auth0/callback' => 'auth0#callback'
  get 'auth/failure' => 'auth0#failure'
  get 'auth/logout' => 'logout#logout'
end
