# config valid for current version and patch releases of Capistrano
lock '~> 3.18.0'

# Change these
server '15.235.187.53', port: 2121, roles: %i[web app], primary: true

set :repo_url,        'git@github.com:thaiphuc2203/product_app.git'
set :application,     'product_app'
set :user,            'deploy'
set :puma_threads,    [4, 16]
set :puma_workers,    0

# Don't change these unless you know what you're doing
set :puma_user, fetch(:user)
set :pty,             true
set :use_sudo,        false
set :stage,           :production
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :puma_bind,       "unix:///home/deploy/apps/product_app/shared/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "/home/deploy/apps/product_app/shared/tmp/pids/puma.state"
set :puma_pid,        "/home/deploy/apps/product_app/shared/tmp/pids/puma.pid"
set :puma_access_log, "/home/deploy/apps/product_app/current/log/puma.error.log"
set :puma_error_log,  "/home/deploy/apps/product_app/current/log/puma.access.log"
set :ssh_options,     { forward_agent: true, user: fetch(:user)}
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true  # Change to false when not using ActiveRecord

## Defaults:
set :branch, 'deploy_original'
# set :scm,           :git
# set :format,        :pretty
# set :log_level,     :debug
# set :keep_releases, 5

## Linked Files & Directories (Default None):
# set :linked_files, %w{config/database.yml}
# set :linked_dirs,  %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir /home/deploy/apps/product_app/shared/tmp/sockets -p"
      execute "mkdir /home/deploy/apps/product_app/shared/tmp/pids -p"
      execute "mkdir /home/deploy/apps/product_app/shared/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc 'Make sure local git is in sync with remote.'
  task :force_bundle_install do
    on roles(:app) do
      within release_path do
        execute :rm, release_path.join('Gemfile.lock')
      end
    end
  end

  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/deploy_original`
        puts 'WARNING: HEAD is not the same as origin/deploy_original'
        puts 'Run `git push` to sync changes.'
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  before :starting,     :check_revision
  after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
  after "deploy:restart", "deploy:cleanup" 
  # after  :finishing,    :restart
end

# ps aux | grep puma    # Get puma pid
# kill -s SIGUSR2 pid   # Restart puma
# kill -s SIGTERM pid   # Stop puma
