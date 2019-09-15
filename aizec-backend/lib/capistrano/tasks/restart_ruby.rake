namespace :custom do
  desc 'restart ruby'
  task :restart_ruby do
    on roles(:app) do
      within release_path do
        execute "pkill ruby || true"
        execute "cd /root/deploy/aizec_backend/current"
        execute "/root/deploy/aizec_backend/current/bin/rails s -e production -d"
      end
    end
  end
end