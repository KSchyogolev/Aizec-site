class UserMailer < ApplicationMailer
  def activate_email
    @user = params[:user]
    @password = params[:password]
    @url  = 'http://innovate-school.com/login'
    mail(to: @user.email, subject: 'Активация аккаунта')
  end
end
