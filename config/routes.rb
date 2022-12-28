Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :follows, only: [:create, :destroy, :update]
    resources :reactions, only: [:create, :destroy, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:create, :update, :show]
    resources :posts, only: [:index, :show, :create]
    resources :comments, only: [:create, :update, :destroy]
  end

end
