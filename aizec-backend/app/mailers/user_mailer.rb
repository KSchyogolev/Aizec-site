class UserMailer < ApplicationMailer
  def activate_email
    @password = params[:password]
    @user     = params[:user]
    @url      = 'https://azimovclub.com/login'
    mail(to: @user.email, subject: 'Активация аккаунта')
  end

  def approve_email
    @user = params[:user]
    @url  = 'https://azimovclub.com/login'
    mail(to: @user.email, subject: 'Ваш аккаунт активирован')
  end

  def check_message
    @message = params[:message]    
    if @message.to_entity_type == "admin"
      mail(to: User.where(role: "admin").map(&:email).join(","), subject: 'Сообщение администратору')
    end
  end

  def revoke_password
    @user = params[:user]
    @password = params[:password]
    @url  = 'https://azimovclub.com/login'
    mail(to: @user.email, subject: 'Ваш пароль обновлен')
  end
end
