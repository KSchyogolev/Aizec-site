Rails.application.routes.draw do
  def archivable_routes(*args)
    args.each do |resource|
      get "#{resource}/archivated", to: "#{resource}#archivated_index"
      get "#{resource}/with_archivated", to: "#{resource}#with_archivated_index"
    end
  end

  def receivable(*args)
    args.each do |resource|
      get "#{resource}/:id/inbox", to: "#{resource}#inbox"
      get "#{resource}/:id/inbox/:message_kind", to: "#{resource}#inbox"
    end
  end

  def has_many_routes(*args)
    args.each do |model|
      model.reflect_on_all_associations.each do |assoc|
        if assoc.is_a? ActiveRecord::Reflection::HasManyReflection or assoc.is_a? ActiveRecord::Reflection::ThroughReflection
          in_name = model.name.pluralize.downcase
          out_name = assoc.plural_name.singularize

          get "#{in_name}/:id/add_#{out_name}/:#{out_name}_id", to: "#{in_name}#add_#{out_name}"
          get "#{in_name}/:id/remove_#{out_name}/:#{out_name}_id", to: "#{in_name}#remove_#{out_name}"
          get "#{in_name}/:id/#{assoc.plural_name}", to: "#{in_name}##{assoc.plural_name}"
        end
      end
    end
  end

  has_many_routes(Group, Course, Club, LessonInfo, LessonType, Lesson, Merch, Message, User)

  archivable_routes :lesson_infos, :payments, :messages, :user_groups, :groups, :clubs, :lessons, :courses, :users

  receivable :clubs, :courses, :groups, :users, :visits
  get "users/:id/outbox", to: "users#outbox"
  get "users/:id/inbox_all", to: "users#inbox_all"
  get "users/:id/inbox_all/:message_kind", to: "users#inbox_all"
  get "users/:id/relevant_courses", to: "users#relevant_courses"
  get "users/:id/clubs", to: "users#clubs"
  get "users/:email/revoke_password", to: "users#revoke_password"

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

  # get 'courses/:id/add_user/:user_id', to: 'courses#add_user'
  # get 'courses/:id/remove_user/:user_id', to: 'courses#remove_user'
  # get 'groups/:id/add_user/:user_id', to: 'groups#add_user'
  # get 'groups/:id/remove_user/:user_id', to: 'groups#remove_user'
  get 'courses/by_user_id/:user_id', to: 'courses#by_user'
  get 'courses/my_courses', to: 'courses#by_user'

  # get 'courses/:id/add_group/:group_id', to: 'courses#add_group'
  # get 'courses/:id/remove_group/:group_id', to: 'courses#remove_group'
  

  get 'lessons/by_user_id/:user_id', to: 'lessons#by_user'
  get 'lessons/my_courses', to: 'lessons#by_user'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
