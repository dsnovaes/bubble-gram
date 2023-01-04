class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ["password"]

    before_action :require_logged_in, only: [:update]

    def show
        if params[:user_id]
            @user = User.find(params[:userid]) # searches by id
        else
            @user = User.find_by(username: params[:id]) # searches by the username
        end
        
        if @user
            if !@user.private_profile || (@user.private_profile && @user.followers.include?(current_user))
                render :show
            else
                render json: { errors: @user.errors.full_messages }, status: 401
            end
        else
            render json: { errors: @user.errors.full_messages }, status: 404
        end
    end

    def create
        @user = User.new(user_params)
        @user.private_profile = true if params[:private_profile] == "true"
        @user.bio = nil if @user.bio == ""
        if @user.save!
            login!(@user)
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @user = User.find_by(username: params[:id])
        if @user.update(user_params)
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password, :name, :email, :bio, :private_profile)
    end

end