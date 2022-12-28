# == Schema Information
#
# Table name: reactions
#
#  id               :bigint           not null, primary key
#  post_id          :bigint           not null
#  user_id          :bigint           not null
#  type_of_reaction :integer          default(0), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Reaction < ApplicationRecord
    validates :user_id, presence: true, uniqueness: { scope: :post_id }
    validates :type_of_reaction, inclusion: [0,1,2]

    belongs_to :user,
        class_name: :User,
        foreign_key: :user_id

    belongs_to :post,
        class_name: :Post,
        foreign_key: :post_id

end
