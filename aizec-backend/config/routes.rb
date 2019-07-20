Rails.application.routes.draw do
  resources :lesson_infos
  resources :lesson_types
  resources :payments
  resources :user_messages
  resources :message_options
  resources :photos
  resources :messages
  resources :user_groups
  resources :groups
  resources :clubs
  resources :merches
  resources :visits
  resources :lessons
  resources :courses
  resources :users
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

  get 'courses/:id/add_user/:user_id', to: 'courses#add_user'
  get 'courses/:id/remove_user/:user_id', to: 'courses#remove_user'
  get 'courses/by_user_id/:user_id', to: 'courses#by_user'
  get 'courses/my_courses', to: 'courses#by_user'

  get 'lessons/by_user_id/:user_id', to: 'lessons#by_user'
  get 'lessons/my_courses', to: 'lessons#by_user'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
