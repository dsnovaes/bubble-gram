class Api::PostsController < ApplicationController

    before_action :require_logged_in, only: [:update]

    def index
        user_id = params[:user_id].to_i
        case params[:type]
        when "feed"
            followings = []
            followings = current_user.followings.pluck("following_id")
            followings.push(current_user.id)
            @posts = Post.where(user_id: followings).order(created_at: :desc)
        when "showPage"
            @posts = Post.where(user_id: user_id).order(created_at: :desc)
        else
            public_profiles = User.where(private_profile: false).pluck("id")
            followed_by_current_user = []
            if current_user
                current_user.followings.each do |follower|
                    followed_by_current_user.push(follower.id)
                end
            end
            @posts = Post.where(user_id: public_profiles).where.not(user_id: followed_by_current_user).order(created_at: :desc)
        end
    end

    def show
        @post = Post.find(params[:id])
        @user = @post.user
        @related = Post.where('user_id = ? AND id != ?', @post.user_id, params[:id]).order(created_at: :desc).limit(6)
        if @post
            if !@post.user.private_profile || @post.user.followers.include?(current_user)
                render :show
            else
                render json: { errors: @post.errors.full_messages }, status: 403
            end
        else
            render json: { errors: @post.errors.full_messages }, status: 404
        end
    end

    def create 
        @post = Post.new(post_params)
        @post.user_id = current_user.id
        if @post.save!
            render :show
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @post = Post.find(params[:id])
        if @post.user_id == current_user.id && @post.update(post_params)
            render :show
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private
    def post_params
        params.require(:post).permit(:user_id, :caption, :media)
    end

end