class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.text :caption
      t.references :user, null: false

      t.timestamps
    end
  end
end
