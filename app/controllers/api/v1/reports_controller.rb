module Api
  module V1
    class ReportsController < ApplicationController
      def report
        
      end

      def all_products_of_user
        card_ids = current_user.cards.pluck(:id)
        @products = Product.joins(:cards).where("card_id in (?)",card_ids)
        render json: @products
      end
    end
  end
end