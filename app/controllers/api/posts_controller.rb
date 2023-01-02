class Api::PostsController < ApplicationController

    before_action :require_logged_in, only: [:update]

    def index
        puts "this is the current_user"
        puts current_user
        puts "this was the current_user"
        puts current_user.followers
        case params[:type]
        when "feed"
            the_user_id = params[:user_id]
            if params[:user_id] == current_user.id
                followings = current_user.following.pluck("following_id")
            else
                user = User.find(the_user_id)
                followings = user.following.pluck("following_id")
            end
            @posts = Post.where(user_id: followings).order(:created_at)
        when "showPage"
            @posts = Post.where(user_id: params[:user_id]).order(:created_at)
        else
            public_profiles = User.where(private_profile: false).pluck("id")
            if current_user
                public_profiles.push(current_user.followers)
            end
            @posts = Post.where(user_id: public_profiles).order(:created_at)
        end
    end

    def show
        @post = Post.find(params[:id])
        if @post
            if !@post.user.private_profile || @post.user_id.followers.include?(current_user)
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
        params.require(:post).permit(:user_id, :caption)
    end

end