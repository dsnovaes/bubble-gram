class Api::PostsController < ApplicationController

    before_action :require_logged_in, only: [:update]

    def index
        @posts = Post.all # filter only those from public profiles
    end

    def update
        @post = Post.find(params[:id])
        if @post.update(post_params)
            render :show
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @post = Post.find(params[:id])
        if @post
            render :show
        else
            render json: { errors: @post.errors.full_messages }, status: 404
        end
    end

    private
    def post_params
        params.require(:post).permit(:user_id, :media_url, :caption)
    end

end