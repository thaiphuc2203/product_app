Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products
      resources :brands
      resources :cards
      get 'brands/:id/products', to: "brands#product_brand"
      post 'clients/request-new-card', to: 'cards#request_new_card'
      put 'cards/:id/cancel', to: 'cards#cancel'
      get 'reports/client/:id', to: 'reports#report'
      get 'clients/products', to: 'reports#all_products_of_user'
    end
  end
  root to: 'home#index'
  post '/register', to: 'registrations#create'
  get '/me', to: 'registrations#me'
  post '/auth/login', to: 'authentication#login'
end
