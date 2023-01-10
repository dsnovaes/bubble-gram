class Api::PostsController < ApplicationController
    wrap_parameters include: Post.attribute_names + ["media", "user_id", "caption"]#, format: :multipart_form

    before_action :require_logged_in, only: [:update]

    def index
        user_id = params[:user_id].to_i
        case params[:type]
        when "feed"
            followings = current_user.followings.pluck("following_id")
            followings.push(current_user.id)
            @posts = Post.where(user_id: followings).order(created_at: :desc)
        when "showPage"
            @posts = Post.where(user_id: user_id).order(created_at: :desc)
        else
            public_profiles = User.where(private_profile: false).pluck("id")
            dont_show_photos_from = [current_user.id]
            if current_user
                current_user.followings.each do |follower|
                    dont_show_photos_from.push(follower.id)
                end
            end
            @posts = Post.where(user_id: public_profiles).where.not(user_id: dont_show_photos_from).order(created_at: :desc)
        end
    end

    def show
        @post = Post.find(params[:id])
        @user = @post.user
        @related = Post.where('user_id = ? AND id != ?', @post.user_id, params[:id]).order(created_at: :desc).limit(6)
        if @post
            if !@post.user.private_profile || @post.user.followers.include?(current_user) || @post.user == current_user
                render :show
            else
                render json: { errors: @post.errors.full_messages }, status: 403
            end
        else
            render json: { errors: @post.errors.full_messages }, status: 404
        end
    end

    def create 
        puts "#= #= #= #= #= #= #= before create the instance of post"
        puts post_params
        @post = Post.new(post_params)
        @post.user_id = current_user.id
        puts "#= #= #= #= #= #= #= before the if statement"
        puts "#= #= #= #= #= #= #= this is the media"
        puts @puts.media
        if @post.save
            puts "#= #= #= #= #= #= #= inside of the if statement, after save"
            render json: { message: "You did it!" }
        else
            puts "#= #= #= #= #= #= #= error message here"
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

    def destroy
        @post = Post.find(params[:id])
        if @post&.destroy
            render json: { comment: nil }
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private
    def post_params
        params.require(:post).permit(:user_id, :caption, :media)
    end

end