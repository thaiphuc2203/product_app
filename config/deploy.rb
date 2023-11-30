lock '~> 3.18.0'

# Change these
server '15.235.187.53', roles: %i[web db app], primary: true

set :repo_url,        'git@github.com:thaiphuc2203/product_app.git'
set :application,     'product_app'
set :user,            'deploy'

# Deploy to the user's home directory
set :deploy_to, "/home/deploy/#{fetch :application}"
set :branch, 'deploy'
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'public/system',
       'public/uploads'

# Only keep the last 5 releases to save disk space
set :keep_releases, 5
