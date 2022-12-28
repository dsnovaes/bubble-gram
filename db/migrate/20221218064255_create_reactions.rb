class CreateReactions < ActiveRecord::Migration[7.0]
  def change
    create_table :reactions do |t|
      t.references :post, null: false
      t.references :user, null: false
      t.integer :type_of_reaction, null: false, default: 0
      t.index [:post_id, :user_id], unique: true

      t.timestamps
    end
  end
end
