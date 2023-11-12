class CardProduct < ApplicationRecord
  belongs_to :card
  belongs_to :product
end
