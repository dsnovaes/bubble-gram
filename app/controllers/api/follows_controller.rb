class Api::FollowsController < ApplicationController

    before_action :require_logged_in

    def create
        check_if_exists = Follow.find_by(follower_id: current_user.id, following_id: follow_params[:following_id])

        case check_if_exists.status
        when "blocked"
            # return error, because the user is trying to follow someone who has blocked them
            render json: { errors: "user blocked" }, status: :unprocessable_entity
        when "accepted"
            # return error, because the user is trying to follow someone who them already follows
            render json: { errors: "can't follow the same user twice" }, status: :unprocessable_entity
        when "pending"
            # return error, because the user is trying to follow someone who them has already requested to follow
            render json: { errors: "can't request again to follow user" }, status: :unprocessable_entity
        else
            @follow = Follow.new(follow_params)
            following = User.find(follow_params[:following_id]) # searches for the user who will be followed
            @follow.status = "accepted" unless following.private_profile # profile is public
            if @follow.follower_id == @follow.following_id
                render json: { errors: "user can't follow themself" }, status: :unprocessable_entity
            elsif @follow.follower_id != @follow.following_id && @follow.save!
                render :show
            else
                render json: { errors: @follow.errors.full_messages }, status: :unprocessable_entity
            end
        end
        
    end

    def update
        @follow = Follow.find_by(follower_id: follow_params[:follower_id], following_id: follow_params[:following_id])
        if @follow&.update!(follow_params)
            render :show
        else
            render json: { errors: @follow.errors.full_messages }, status: :unprocessable_entity
        end
    end


    def destroy
        @follow = Follow.find_by(follower_id: follow_params[:follower_id], following_id: follow_params[:following_id])
        if @follow&.destroy
            render json: { follow: nil }
        else
            render json: { errors: @follow.errors.full_messages }, status: :unprocessable_entity
        end

    end

    private
    def follow_params
        params.require(:follow).permit(:follower_id, :following_id, :status)
    end

end