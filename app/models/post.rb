# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  caption    :text
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    
    validates :user_id, presence: true

    belongs_to :user,
        class_name: :User,
        foreign_key: :user_id

    has_many :comments,
        class_name: :Comment,
        foreign_key: :post_id,
        dependent: :destroy

    has_many :reactions,
        class_name: :Reaction,
        foreign_key: :post_id,
        dependent: :destroy
    
    has_many :likers,
        through: :reactions,
        source: :user
    
    has_one_attached :media

end
