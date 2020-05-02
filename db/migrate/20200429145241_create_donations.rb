class CreateDonations < ActiveRecord::Migration[5.2]
  def change
    create_table :donations do |t|
      t.string :resource_id, null: false
      t.integer :user_id, null: false
      t.string :currency, null: false
      t.decimal :amount, null: false
      t.string :status, null: false
      t.string :pledgeling_id, null: false
      t.string :pledgeling_organization_id, null: false
      t.string :pledgeling_organization_name, null: false
      t.boolean :live, null: true
      t.timestamps
    end
  end
end
