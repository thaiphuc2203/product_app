class CreateCards < ActiveRecord::Migration[7.1]
  def change
    create_table :cards do |t|
      t.string :name
      t.decimal :price
      t.string :pin
      t.string :status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
