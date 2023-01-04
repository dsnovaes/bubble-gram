# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string
#  name            :string           not null
#  email           :string           not null
#  bio             :string
#  private_profile :boolean          default(FALSE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

    has_secure_password
    before_validation :ensure_session_token
    
    validates :username, uniqueness: true, format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :name, presence: true
    validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    has_many :posts,
        class_name: :Post,
        foreign_key: :user_id,
        dependent: :destroy

    has_many :comments,
        class_name: :Comment,
        foreign_key: :user_id,
        dependent: :destroy

    has_many :reactions,
        class_name: :Reaction,
        foreign_key: :user_id,
        dependent: :destroy

    has_many :is_followed, -> { where status: "accepted" },
        class_name: :Follow,
        foreign_key: :following_id,
        dependent: :destroy

    has_many :followers,
        through: :is_followed,
        source: :user

    has_many :follows, -> { where status: "accepted" },
        class_name: :Follow,
        foreign_key: :follower_id,
        dependent: :destroy

    has_many :followings,
        through: :follows,
        source: :following
    
    has_one_attached :profile_picture

    def self.find_by_credentials(credential, password)
        user = nil
        if URI::MailTo::EMAIL_REGEXP.match(credential)
            user = User.find_by(email: credential)
        else
            user = User.find_by(username: credential)
        end

        if user&.authenticate(password)
            user
        else
            nil
        end
    end

    def reset_session_token!
        self.update!(session_token: generate_unique_session_token)
        self.session_token
    end

    private

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def generate_unique_session_token
        token = SecureRandom::urlsafe_base64
        while User.exists?(session_token: token)
            token = SecureRandom::urlsafe_base64
        end
        token
    end

end
