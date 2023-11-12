module Api
  module V1
    class BrandsController < ApplicationController
      before_action :set_brand, only: %i[show update destroy product_brand]

      # GET /brands
      def index
        @brands = Brand.all

        render json: @brands
      end

      # GET /brands/1
      def show
        render json: @brand
      end
      def product_brand
        @product_brand = @brand.products

        render json: @product_brand
      end

      # POST /brands
      def create
        @brand = Brand.new(brand_params)

        if @brand.save
          render json: @brand, status: :created
        else
          render json: @brand.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /brands/1
      def update
        if @brand.update(brand_params)
          render json: @brand
        else
          render json: @brand.errors, status: :unprocessable_entity
        end
      end

      # DELETE /brands/1
      def destroy
        @brand.destroy!
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_brand
        @brand = Brand.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def brand_params
        # params.require(:brand).permit(:name, :avatar, :short_name, :status, :store_number)
        params.require(:brand).permit(:name)
      end
    end
  end
end
