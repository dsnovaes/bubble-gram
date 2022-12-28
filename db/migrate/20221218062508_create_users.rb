class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false, index: {unique: true}
      t.string :session_token, null: false, index: { unique: true }
      t.string :password_digest
      t.string :name, null: false
      t.string :email, null: false
      t.string :bio
      t.boolean :private_profile, null: false, default: false

      t.timestamps
    end
  end
end
