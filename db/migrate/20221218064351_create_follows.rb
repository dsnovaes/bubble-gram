class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.references :follower, null: false, foreign_key: { to_table: :users }
      t.references :following, null: false, foreign_key: { to_table: :users }
      t.string :status, null: false, default: "pending"
      t.index [:follower_id, :following_id], unique: true

      t.timestamps
    end
  end
end
