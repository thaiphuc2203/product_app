class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :avatar
      t.string :sku
      t.boolean :status
      t.decimal :price
      t.references :brand, null: false, foreign_key: true

      t.timestamps
    end
  end
end
