class Api::SessionsController < ApplicationController

  before_action :require_logged_in, only: [:destroy]


  puts "#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#"
  puts
  puts "entrou no session controler"
  puts
  puts "#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#"


  def show
    puts "#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#"
    puts
    puts "[GET] session controler"
    puts
    puts "#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#"
    if current_user
      @user = current_user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    puts "#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#"
    puts
    puts "[POST] session controler"
    puts
    puts "#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#"
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.'] }, 
      status: :unauthorized
    end
  end

  def destroy
    logout!
    render json: { message: 'success' }
  end
end