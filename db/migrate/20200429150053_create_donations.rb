class CreateDonations < ActiveRecord::Migration[5.2]

  enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')

  def change
    create_table :donations, id: :uuid do |t|
      t.boolean :live,                          null: false, default: false
      t.boolean :verified,                      null: false, default: false
      t.string  :currency,                      null: false
      t.decimal :amount,                        null: false

      # Pledgeling
      t.string  :status,                        null: false
      t.string  :pledgeling_id,                 null: false
      t.string  :pledgeling_organization_id,    null: false
      t.string  :pledgeling_organization_name,  null: false

      t.references :user, index: true, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
