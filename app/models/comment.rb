# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  post_id    :bigint           not null
#  user_id    :bigint           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
    validates :post_id, :user_id, :body, presence: true

    belongs_to :post,
        class_name: :Post,
        foreign_key: :post_id

    belongs_to :user,
        class_name: :User,
        foreign_key: :user_id
end
