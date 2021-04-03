class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users, id: :uuid do |t|
      t.string  :email,         null: false
      t.string  :first_name
      t.string  :last_name
      t.string  :nickname
      t.decimal :monthly_goal
      t.integer :privacy_level, null: false, default: 0

      t.timestamps
    end
  end
end
