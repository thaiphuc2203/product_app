set :stage, :production
set :rails_env, :production
set :branch, 'deploy-aws'
set :deploy_to, '/home/deploy/deploy/product_app'
server '3.1.49.176', user: 'deploy', roles: %w[app db web]
