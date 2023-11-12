class User < ApplicationRecord
  has_many :cards

  has_secure_password
end
