# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_25_104037) do

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "clubs", force: :cascade do |t|
    t.string "name"
    t.string "status", default: "active"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clubs_courses", id: false, force: :cascade do |t|
    t.integer "club_id", null: false
    t.integer "course_id", null: false
    t.index ["club_id", "course_id"], name: "index_clubs_courses_on_club_id_and_course_id"
  end

  create_table "courses", force: :cascade do |t|
    t.integer "cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.string "name"
    t.string "short_description"
    t.string "full_description"
    t.integer "cost_month"
    t.string "kind"
    t.string "ancestry"
    t.index ["ancestry"], name: "index_courses_on_ancestry"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name"
    t.string "status", default: "active"
    t.integer "club_id"
    t.integer "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["club_id"], name: "index_groups_on_club_id"
    t.index ["course_id"], name: "index_groups_on_course_id"
  end

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp"
    t.index ["jti"], name: "index_jwt_blacklist_on_jti"
  end

  create_table "jwt_blacklists", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp"
    t.index ["jti"], name: "index_jwt_blacklists_on_jti"
  end

  create_table "lesson_infos", force: :cascade do |t|
    t.string "short_description"
    t.string "full_description"
    t.string "synopsys"
    t.string "homework"
    t.integer "duration"
    t.string "status"
    t.integer "course_id", null: false
    t.integer "lesson_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_lesson_infos_on_course_id"
    t.index ["lesson_type_id"], name: "index_lesson_infos_on_lesson_type_id"
  end

  create_table "lesson_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lessons", force: :cascade do |t|
    t.datetime "start_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "group_id"
    t.integer "lesson_info_id"
    t.string "status", default: "closed"
    t.index ["group_id"], name: "index_lessons_on_group_id"
    t.index ["lesson_info_id"], name: "index_lessons_on_lesson_info_id"
  end

  create_table "merches", force: :cascade do |t|
    t.string "name", null: false
    t.string "photo_path"
    t.integer "cost", null: false
    t.string "short_description"
    t.string "full_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "message_options", force: :cascade do |t|
    t.string "name"
    t.integer "index"
    t.integer "message_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id"], name: "index_message_options_on_message_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "kind"
    t.string "status", default: "not_readen"
    t.integer "user_id", null: false
    t.string "to_entity_type"
    t.integer "to_entity_id"
    t.string "head_text"
    t.string "full_text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "payments", force: :cascade do |t|
    t.integer "bonuses"
    t.integer "cost"
    t.string "status"
    t.integer "user_id", null: false
    t.integer "course_id"
    t.integer "merch_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_payments_on_course_id"
    t.index ["merch_id"], name: "index_payments_on_merch_id"
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "photos", force: :cascade do |t|
    t.string "name"
    t.string "path"
    t.integer "message_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id"], name: "index_photos_on_message_id"
  end

  create_table "user_groups", force: :cascade do |t|
    t.datetime "payment_date"
    t.string "status", default: "not_payed"
    t.integer "user_id"
    t.integer "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_user_groups_on_group_id"
    t.index ["user_id"], name: "index_user_groups_on_user_id"
  end

  create_table "user_messages", force: :cascade do |t|
    t.integer "chosen_option"
    t.string "status"
    t.integer "user_id", null: false
    t.integer "message_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id"], name: "index_user_messages_on_message_id"
    t.index ["user_id"], name: "index_user_messages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "second_name"
    t.string "role"
    t.string "photo"
    t.string "bio"
    t.string "phone"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "third_name"
    t.string "status"
    t.integer "bonus_count"
    t.boolean "gender"
    t.string "address"
    t.string "parents"
    t.date "birthday"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "visits", force: :cascade do |t|
    t.string "status"
    t.string "homework_comment"
    t.string "teacher_comment"
    t.string "approve_status"
    t.integer "user_id"
    t.integer "lesson_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lesson_id"], name: "index_visits_on_lesson_id"
    t.index ["user_id"], name: "index_visits_on_user_id"
  end

end
