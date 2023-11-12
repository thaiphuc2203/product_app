class Card < ApplicationRecord
  belongs_to :user
  has_many :card_products
  has_many :products, through: :card_products
end
