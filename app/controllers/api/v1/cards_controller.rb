module Api
  module V1
    class CardsController < ApplicationController
      before_action :set_card, only: %i[show update destroy]

      # GET /cards
      def index
        @cards = Card.all

        render json: @cards
      end

      # GET /cards/1
      def show
        render json: @card
      end

      # POST /clients/request-new-card
      def request_new_card
        @card = current_user.cards.new(card_request_params)

        if @card.save
          @card_product = @card.products.build
          render json: {
            card: @card,
            card_products: @card.products.reload
          }, status: :accepted
        else
          render json: @card.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /cards/1
      def update
        if @card.update(card_params)
          render json: @card
        else
          render json: @card.errors, status: :unprocessable_entity
        end
      end

      def approve_card
        if current_user.role == 'role'
          @card = current_user.cards.find(params[:id])
          @card = @card.update(status: 'approved')
          render json: @card
        else
          render json: { message: 'Ask Admin for this action' }, status: :unauthorized
        end
      end

      def cancel
        @card.update!(status: 'cancelled')
        render json: @card
      end

      # DELETE /cards/1
      def destroy
        @card.destroy!
      end

      private

      def card_request_params
        card_request_params = params.require(:card).permit(:name, :pin, :price, :product_ids)
        card_request_params.merge!(product_ids: params[:card][:product_ids].split(','), status: 'pending')
        card_request_params
      end

      # Use callbacks to share common setup or constraints between actions.
      def set_card
        @card = current_user.cards.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def card_params
        params.require(:card).permit(:name, :price, :pin, :status)
      end
    end
  end
end
