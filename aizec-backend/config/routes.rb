Rails.application.routes.draw do
  def archivable_routes(*args)
    args.each do |resource|
      get "#{resource}/archivated", to: "#{resource}#archivated_index"
      get "#{resource}/with_archivated", to: "#{resource}#with_archivated_index"
    end
  end

  archivable_routes :lesson_infos, :payments, :messages, :user_groups, :groups, :clubs, :lessons, :courses, :users

  resources(:lesson_infos, :lesson_types, :payments, :user_messages, 
    :message_options, :photos, :messages, :user_groups, :groups, :clubs, 
    :merches, :visits, :lessons, :courses, :users)
  

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

  get 'users/:id/approve', to: 'users#approve'
  post 'users/activate', to: 'users#activate'
  post 'users/create_by_email', to: 'users#create_by_email'
  get 'users/:id/offers', to: 'users#offers'
  get 'users/my-offers', to: 'users#offers'

  get 'courses/:id/add_user/:user_id', to: 'courses#add_user'
  get 'courses/:id/remove_user/:user_id', to: 'courses#remove_user'
  get 'groups/:id/add_user/:user_id', to: 'groups#add_user'
  get 'groups/:id/remove_user/:user_id', to: 'groups#remove_user'
  get 'courses/by_user_id/:user_id', to: 'courses#by_user'
  get 'courses/my_courses', to: 'courses#by_user'

  get 'lessons/by_user_id/:user_id', to: 'lessons#by_user'
  get 'lessons/my_courses', to: 'lessons#by_user'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
