class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ["password", "profile_picture"]

    before_action :require_logged_in, only: [:update]

    def index
        case params[:type]
        when "query"
            @users = User.where("username LIKE ?", params[:query])
        when "suggestions"
            followingsAndCurrentUser = current_user.followings.pluck("following_id")
            followingsAndCurrentUser.push(current_user.id)
            @users = User.where.not(id: followingsAndCurrentUser).limit(3)
        else
            @users = User.all
            puts "#=#=#=#=#=#= number of users #{@users.length}"
        end
        render :index
    end

    def show
        if params[:user_id]
            @user = User.find(params[:user_id]) # searches by id
        elsif params[:username]
            @user = User.find_by(username: params[:username]) # searches by the username
        end

        if @user
            if @user.id == current_user.id || !@user.private_profile || (@user.private_profile && @user.followers.include?(current_user))
                @show_posts = true
                render :show
            else
                @show_posts = false
                render :show
            end
        else
            render json: { errors: @user.errors.full_messages }, status: 404
        end
        
        # if @user
        #     if !@user.private_profile || (@user.private_profile && @user.followers.include?(current_user))
        #         render :show
        #     else
        #         render json: { errors: @user.errors.full_messages }, status: 401
        #     end
        # else
        #     render json: { errors: @user.errors.full_messages }, status: 404
        # end
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

    def search

        query=params[:query]
        @users = User.where('name ILIKE ? OR username ILIKE ? OR bio ILIKE ?', "%#{query}%", "%#{query}%", "%#{query}%")
        if @users.length > 0
            render :index
        else
            render json: ["Sorry, we did not find any results for #{query}, try another search"], status: 404
        end

    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password, :name, :email, :bio, :private_profile, :profile_picture)
    end

end