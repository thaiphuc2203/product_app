class CreateCardProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :card_products do |t|
      t.references :card, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
