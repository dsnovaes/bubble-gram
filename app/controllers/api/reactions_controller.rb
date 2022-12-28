class Api::ReactionsController < ApplicationController

    before_action :require_logged_in

    def create
        @reaction = Reaction.new(reaction_params)
        if @reaction.save!
            render :show
        else
            render json: { errors: @reaction.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @reaction = Reaction.find(params[:id])
        if @reaction&.update!(reaction_params)
            render :show
        else
            render json: { errors: @reaction.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @reaction = Reaction.find(params[:id])
        if @reaction&.destroy
            render json: { reaction: nil }
        else
            render json: { errors: @reaction.errors.full_messages }, status: :unprocessable_entity
        end

    end

    private
    def reaction_params
        params.require(:reaction).permit(:post_id, :user_id, :type_of_reaction)
    end

end