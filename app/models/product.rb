class Product < ApplicationRecord
  belongs_to :brand
  has_many :card_products
  has_many :cards, through: :card_products
end
