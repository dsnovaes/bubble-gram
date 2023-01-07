class Api::CommentsController < ApplicationController

    def index
        @comments = Comment.where(post_id: params[:post_id]) if params[:post_id]
        render :index
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.user_id = current_user.id
        if @comment.save!
            render :show
        else
            render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if @comment&.update(comment_params)
            render :show
        else
            render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        if @comment&.destroy
            render json: { comment: nil }
        else
            render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private
    def comment_params
        params.require(:comment).permit(:post_id, :user_id, :body)
    end

end