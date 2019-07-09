Rails.application.routes.draw do
  resources :visits
  resources :lessons
  resources :courses
  devise_for :users,
             path: '',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
