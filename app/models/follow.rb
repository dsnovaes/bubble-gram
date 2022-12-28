# == Schema Information
#
# Table name: follows
#
#  id           :bigint           not null, primary key
#  follower_id  :bigint           not null
#  following_id :bigint           not null
#  status       :string           default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Follow < ApplicationRecord
    validates :following_id, presence: true
    validates :follower_id, presence: true, uniqueness: { scope: :following_id }
    validates :status, inclusion: ["pending", "accepted", "blocked"]

    belongs_to :user,
        class_name: :User,
        foreign_key: :follower_id

    belongs_to :following,
        class_name: :User,
        foreign_key: :following_id
end
