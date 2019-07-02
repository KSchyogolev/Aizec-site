Fabricator(:user) do
  password { BCrypt::Password.create('secret') }

  first_name "MyString"
  second_name "MyString"
  role "MyString"
  photo "MyString"
  bio "MyString"
  phone "MyString"
  email "a@v.v"
end
