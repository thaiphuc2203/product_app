lock '~> 3.18.0'

# Change these
server '15.235.187.53',port: 2121, roles: %i[web db app], primary: true

set :repo_url,        'git@github.com:thaiphuc2203/product_app.git'
set :application,     'product_app'
set :user,            'deploy'

# Deploy to the user's home directory
set :deploy_to, "/home/deploy/#{fetch :application}"
set :branch, 'deploy'
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'public/system',
       'public/uploads'
append :linked_files, 'config/master.key'
# Only keep the last 5 releases to save disk space
set :keep_releases, 5
# Hook the task to run after the migration

namespace :deploy do
  desc 'Run rake db:seed'
  task :seed do
    on roles(:app) do
      within release_path do
        execute :bundle, :exec, :rake, 'db:seed RAILS_ENV=production'
      end
    end
  end
  namespace :check do
    before :linked_files, :set_master_key do
      on roles(:app), in: :sequence, wait: 10 do
        unless test("[ -f #{shared_path}/config/master.key ]")
          upload! 'config/master.key', "#{shared_path}/config/master.key"
        end
      end
    end
  end
end
