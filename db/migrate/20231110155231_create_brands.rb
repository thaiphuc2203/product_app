class CreateBrands < ActiveRecord::Migration[7.1]
  def change
    create_table :brands do |t|
      t.string :name
      t.string :avatar
      t.string :short_name
      t.boolean :status
      t.integer :store_number

      t.timestamps
    end
  end
end
