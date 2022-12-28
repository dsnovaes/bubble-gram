class Api::CommentsController < ApplicationController

    def create
        @comment = Comment.new(comment_params)
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