# README

# Типы

Здесь перечислены типы которые в основном на самом деле просто строки, но принимают ограниченное число значений. 

Они все проходят валидацию и не принимают всяких лишних пробелов, аперкейзов и всего такого 
чтобы на этапе разработки можно было бы найти где фронт шлёт что-то некорректное

### Positive Integer

Целое число больше нуля)

### Role

* `user`
* `teacher`
* `admin`

### Archivable

* `archived` — запись заархивированна и не будет нигде возникать, если спецом не сделаешь запрос на заархивированные записи
* `active` — всё ок, значение по умолчанию

### Course Type

Влияет на цвет в календаре и способ создания

* `intensive` — при создании каждая дата занятия задаётся вручную, обычно непрерывно неделя занятий
* `regular` — при создании задаётся один или несколько дней недели и время

### Entity Type

Одно из названий таблиц (только те сущности которые могут принимать сообщения)

* `user` 
* `club` 
* `group` 
* `course` 
* `visit` — фотки к домашке или справка о пропуске
* `all` — всем пользователям 
* `admin` — всем админам

### Message Type

* `report` — отчет админу от учителя 
* `homework`  
* `notification`  
* `achivement`  
* `offer` — то что отобразиться у пользователя в разделе "предложения"
* `poll` — опрос
* `skip` — пруфы пропуска занятий

### Lesson Status

* archived — также как и в обычных архивируемых статусах
* closed — начальное значение
* open — препод дал доступ к конспекту и домашке занятий

### User Group Status

Оплата и посещение группы

* null — также валидное значение например для отображения что препод относится к группе
* `archived` — прекратил посещение занятий
* `not_payed` — начальное значение для ученика когда он только зарегистрировался / выбрал курс. После первой оплаты актуальная инфа об оплате в поле `payment_date`
* `payed` — первая оплата подтверждена
* `finished` — курс успешно пройден

### User Status

* `archived` 
* `active` — ок статус, для учителей и админов сразу устанавливается
* `not_activated` — начальный статус для учеников. заполнен только email и пароль. ребуется заполнить всю инфу о себе
* `not_approved` — всё заполнено, ожидается подтверждение от админа (туду: а что если не подтвердит?)

### User Messages Status

* `readen` 
* `not_readen`

### Visits Status

* null - препод ещё не проставил посещаемость (только при создании занятий, самому не поставить)
* `ok` — был на занятии
* `skip_without_reason` — пропуск без возмещения бабосов
* `skip_not_approved` — скинул преподу причину пропуска
* `skip_approved_teacher` — препод подтвердил пропуск (можно ставить если сам препод зафоткает справку)
* `skip_approved`— админ подтвердил, деньги возвращаются ученику

### Approve Status

Статус домашнего задания

* null — не выслано или не требуется совсем
* `done_not_approved` 
* `done_approved` 
* `need_fix`  

# Модели

Помимо перечисленных полей у всех моделей есть поля `id`, `created_at`, `updated_at`. Для фронта они ридонли. 
В основном для всего можно ставить нулы, но лучше при необходимости такой случай обсудить.


## Users 

Имеет много: [Посещений](#visits), [User Groups](#user-groups), [Платежей](#payments), [User Messages](user-messages)

Много ко многим: 

- [Занятия](#lessons) через [Посещения](#visits)
- [Группы](#groups) через [UserGroups](#user-groups)
- [Сообщения](#messages) через [User Messages](user-messages)
- [Курсы](#courses) через [Платежи](#payments)
- [Товары](#merches) через [Платежи](#payments)

|          Название поля | Тип                        | Комментарий                                                                  |
|-----------------------:|:---------------------------|:-----------------------------------------------------------------------------|
|             first_name | string                     |                                                                              |
|            second_name | string                     |                                                                              |
|             third_name | string                     | Отчество                                                                     |
|                   role | [role](role)               |                                                                              |
|                  photo | string                     |                                                                              |
|                    bio | string                     |                                                                              |
|                  phone | string                     |                                                                              |
|                  email | string                     |                                                                              |
|     encrypted_password | string                     |                                                                              |
| reset_password_sent_at | datetime                   | Это тебе не надо                                                             |
|    remember_created_at | datetime                   | Это тоже                                                                     |
|   reset_password_token | string                     |                                                                              |
|      parent_first_name | string                     |                                                                              |
|     parent_second_name | string                     |                                                                              |
|      parent_third_name | string                     |                                                                              |
|                 status | [User Status](user-status) |                                                                              |
|            bonus_count | integer                    |                                                                              |
|    parent_relationship | string                     | типа мать/отец/отчим                                                         |
|                 gender | boolean                    | Классические патриархальные гендеры, думаю сам понимаешь какой из них `true` |
|                address | string                     |                                                                              |
|        identifier_type | string                     | тип удостоверяющего документа                                                |
|      identifier_number | string                     | номер документа                                                              |



## Courses 

Имеет много: [Групп](#groups), [Курсов](#courses), [Платежей](#payments), [Описаний уроков](#lesson-infos)

Много ко многим: [Клубы](#clubs)

|     Название поля | Тип                                   | Комментарий                                                              |
|------------------:|:--------------------------------------|:-------------------------------------------------------------------------|
|              cost | [positive integer](#positive-integer) |                                                                          |
|            status | [Archivable](#archivable)             |                                                                          |
|              name | string                                |                                                                          |
| short_description | string                                |                                                                          |
|  full_description | string                                |                                                                          |
|        cost_month | [positive integer](#positive-integer) |                                                                          |
|              kind | [Course Type](#course-kind)           |                                                                          |
|          ancestry | string                                | Показывает какой курс предшествует какому, посылай `parent_id` в джсонке |


## Clubs

Имеет много: [Групп](#groups)

Много ко многим: [Курсы](#courses)

| Название поля | Тип                       | Комментарий |
|--------------:|:--------------------------|:------------|
|          name | string                    |             |
|        status | [Archivable](#archivable) |             |
|       address | string                    |             |


### Clubs Courses 

Таблица для много-ко-многим [Курсы](#courses) <===> [Клубы](#clubs) 

Отображает какие курсы доступны в клубе. На фронте о ней можно забыть

| Название поля | Тип     | Комментарий |
|--------------:|:--------|:------------|
|       club_id | integer |             |
|     course_id | integer |             |



## Groups 

Имеет много: [Уроков](#lessons), [UserGroups](#user-groups)

Принадлежит к: [Клубам](#clubs), [Курсам](#courses)

Много ко многим: [Пользователи](#users) через [UserGroups](#user-groups)

| Название поля | Тип                       | Комментарий |
|--------------:|:--------------------------|:------------|
|          name | string                    |             |
|        status | [Archivable](#archivable) |             |
|       club_id | integer                   |             |
|     course_id | integer                   |             |

### User Groups 

Таблица для много-ко-многим [Пользователи](#users) <===> [Группы](#groups). Также содержит инфу об оплате. 

| Название поля | Тип                                     | Комментарий                       |
|--------------:|:----------------------------------------|:----------------------------------|
|  payment_date | datetime                                | Дата до какого числа оплачен курс |
|        status | [User Group Status](#user-group-status) |                                   |
|       user_id | integer                                 |                                   |
|      group_id | integer                                 |                                   |


## Lesson Infos 

Прототип занятия. Имеет всё его описание, коспект, домашку, но конкретное занятие будет иметь также и время.
То есть одинаковые курсы в разных клубах будут иметь идентичные уроки с разным расписанием

Имеет много: [Уроков](#lessons)

Принадлежит к: [Типу занятий](#lesson-types), [Курсам](#courses)


|     Название поля | Тип                                   | Комментарий                                        |
|------------------:|:--------------------------------------|:---------------------------------------------------|
| short_description | string                                |                                                    |
|  full_description | string                                | Описание (не факт что пригодится)                  |
|          synopsys | string                                | Конспект (будет открыто когда учитель даст доступ) |
|          homework | string                                | Описание всей домашки                              |
|          duration | [positive integer](#positive-integer) | Длительность занятий в минутах                     |
|            status | [Archivable](#archivable)             |                                                    |
|         course_id | integer                               |                                                    |
|    lesson_type_id | integer                               |                                                    |


### Lesson Types 

Тип занятия: робототехника, пайка, питон... Будут иметь разные иконки, возможно стоит их хранить в базе или хардкодить.

Имеет много: [Описаний уроков](#lesson-infos)

| Название поля | Тип    | Комментарий |
|--------------:|:-------|:------------|
|          name | string |             |


### Lessons 

Конкретные занятия со временем и группой.

Имеет много: [Посещений](#visits)

Принадлежит к: [Группам](#groups), [Описаниям занятий](#lesson-infos)

Много ко многим: [Пользователи](#users) через [Посещения](#visits)

|  Название поля | Тип                             | Комментарий |
|---------------:|:--------------------------------|:------------|
|     start_time | datetime                        |             |
|       group_id | integer                         |             |
| lesson_info_id | integer                         |             |
|         status | [Lesson Status](#lesson-status) |             |


### Visits 

Статус посещения и домашки. Много ко многим для [Пользователи](#users) <===> [Занятия](#lessons)

|    Название поля | Тип                              | Комментарий                                                |
|-----------------:|:---------------------------------|:-----------------------------------------------------------|
|           status | [Visits Status](visits-status)   |                                                            |
| homework_comment | string                           | Скорей всего не используется                               |
|  teacher_comment | string                           | Комментарий домашке от препода                             |
|   approve_status | [Approve Status](approve-status) | Статус домашки (да название у поля неудачное было выбрано) |
|          user_id | integer                          |                                                            |
|        lesson_id | integer                          |                                                            |


## Merches 

Товары с описанием и фоткой.

Имеет много: [Платежей](#payments)

|     Название поля | Тип                                   | Комментарий |
|------------------:|:--------------------------------------|:------------|
|              name | string                                |             |
|        photo_path | string                                |             |
|              cost | [positive integer](#positive-integer) |             |
| short_description | string                                |             |
|  full_description | string                                |             |

### Payments 

Оплата курсов или товаров. Одно из полей ненул: `course_id` или `merch_id`. По сути таблица много-ко-многим

Принадлежит к: [Пользователям](#users), [Курсам](#courses), [Товарам](#merches)

| Название поля | Тип                                   | Комментарий                  |
|--------------:|:--------------------------------------|:-----------------------------|
|       bonuses | [positive integer](#positive-integer) | Сколько бонусов использовано |
|          cost | [positive integer](#positive-integer) | = стоимость товара - бонусы  |
|        status | [Archivable](#archivable)             |                              |
|       user_id | integer                               |                              |
|     course_id | integer                               |                              |
|      merch_id | integer                               |                              |



## Messages 

Сообщения - многогранная хуйня. Нотификации для пользователей / Опросы / Отчеты админам / Фотки с домашкой

Отправитель обязательно пользователь, получающей стороной может быть одна из доступных для выбора таблиц, характеризуюшая группу пользователей. `to_entity_id` может быть нулом `to_entity_type` = `admin` или например `all`

Имеет много: [Фоток](#photos), [Опций Опроса](#message-options), [User Messages](#user-messages)

Много ко многим: [Пользователи](#users) через [User Messages](#user-messages)

|  Название поля | Тип                           | Комментарий                                       |
|---------------:|:------------------------------|:--------------------------------------------------|
|           kind | [Message Type](#message-kind) |                                                   |
|         status | [Archivable](#archivable)     |                                                   |
|        user_id | integer                       | Отправитель                                       |
| to_entity_type | [Entity Type](#entity-kind)   |                                                   |
|   to_entity_id | integer                       | id сущности из таблицы которая выбрана полем выше |
|      head_text | string                        | Заголовок (скорей всего никогда не пригодится)    |
|      full_text | string                        |                                                   |
    

### Message Options 

Опции ответов на опросы. 

Принадлежит к: [Сообщениям](#messages)

| Название поля | Тип                                   | Комментарий      |
|--------------:|:--------------------------------------|:-----------------|
|          name | string                                |                  |
|         index | [positive integer](#positive-integer) | Порядковый номер |
|    message_id | integer                               |                  |

### Photos 

Принадлежит к: [Сообщениям](#messages)

| Название поля | Тип     | Комментарий                 |
|--------------:|:--------|:----------------------------|
|          name | string  | Оригинальное название файла |
|          path | string  | Текущий относительный url   |
|    message_id | integer |                             |


### User Messages 

Статус прочтения и выбранный вариант в опросе. Много ко многим для [Пользователи](#users) <===> [Сообщения](#messages)

| Название поля | Тип                                          | Комментарий                      |
|--------------:|:---------------------------------------------|:---------------------------------|
| chosen_option | [positive integer](#positive-integer)        | Выбранная опция в опросе или нул |
|        status | [User Messages Status](user-messages-status) |                                  |
|       user_id | integer                                      |                                  |
|    message_id | integer                                      |                                  |


### jwt_blacklist 

Для логина. На фронте не пригодится

| Название поля | Тип      | Комментарий |
|--------------:|:---------|:------------|
|           jti | string   |             |
|           exp | datetime |             |

# Урлы

Условно скажем есть 5 групп пользователей: 

* `unathorized` неавторизованные/неактивированные/неподтвержденные
* `user` ученик 
* `owner` если сущность относится к пользователю (например домашка) то он и админ её может смотреть/модифицировать
* `teacher`
* `admin` 


| Метод  | Путь                                                                           | Доступ | Принимает | Возвращает | Комментарий |
|:------:|:-------------------------------------------------------------------------------|:------:|:----------|:-----------|:------------|
|  POST  | /users/create-unactivated                                                      | admin  |           |            |             |
| PATCH  | /users/activate                                                                | owner  |           |            |             |
| PATCH  | /users/:id/approve                                                             | admin  |           |            |             |
|  POST  | /users/create-admin                                                            | admin  |           |            |             |
|  POST  | /users/create-teacher                                                          | admin  |           |            |             |
|  GET   | /lesson_infos/archivated                                                       |        |           |            |             |
|  GET   | /lesson_infos/with_archivated                                                  |        |           |            |             |
|  GET   | /payments/archivated                                                           |        |           |            |             |
|  GET   | /payments/with_archivated                                                      |        |           |            |             |
|  GET   | /messages/archivated                                                           |        |           |            |             |
|  GET   | /messages/with_archivated                                                      |        |           |            |             |
|  GET   | /user_groups/archivated                                                        |        |           |            |             |
|  GET   | /user_groups/with_archivated                                                   |        |           |            |             |
|  GET   | /groups/archivated                                                             |        |           |            |             |
|  GET   | /groups/with_archivated                                                        |        |           |            |             |
|  GET   | /clubs/archivated                                                              |        |           |            |             |
|  GET   | /clubs/with_archivated                                                         |        |           |            |             |
|  GET   | /lessons/archivated                                                            |        |           |            |             |
|  GET   | /lessons/with_archivated                                                       |        |           |            |             |
|  GET   | /courses/archivated                                                            |        |           |            |             |
|  GET   | /courses/with_archivated                                                       |        |           |            |             |
|  GET   | /users/archivated                                                              |        |           |            |             |
|  GET   | /users/with_archivated                                                         |        |           |            |             |
|  GET   | /lesson_infos                                                                  |        |           |            |             |
|  POST  | /lesson_infos                                                                  |        |           |            |             |
|  GET   | /lesson_infos/:id                                                              |        |           |            |             |
| PATCH  | /lesson_infos/:id                                                              |        |           |            |             |
|  PUT   | /lesson_infos/:id                                                              |        |           |            |             |
| DELETE | /lesson_infos/:id                                                              |        |           |            |             |
|  GET   | /lesson_types                                                                  |        |           |            |             |
|  POST  | /lesson_types                                                                  |        |           |            |             |
|  GET   | /lesson_types/:id                                                              |        |           |            |             |
| PATCH  | /lesson_types/:id                                                              |        |           |            |             |
|  PUT   | /lesson_types/:id                                                              |        |           |            |             |
| DELETE | /lesson_types/:id                                                              |        |           |            |             |
|  GET   | /payments                                                                      |        |           |            |             |
|  POST  | /payments                                                                      |        |           |            |             |
|  GET   | /payments/:id                                                                  |        |           |            |             |
| PATCH  | /payments/:id                                                                  |        |           |            |             |
|  PUT   | /payments/:id                                                                  |        |           |            |             |
| DELETE | /payments/:id                                                                  |        |           |            |             |
|  GET   | /user_messages                                                                 |        |           |            |             |
|  POST  | /user_messages                                                                 |        |           |            |             |
|  GET   | /user_messages/:id                                                             |        |           |            |             |
| PATCH  | /user_messages/:id                                                             |        |           |            |             |
|  PUT   | /user_messages/:id                                                             |        |           |            |             |
| DELETE | /user_messages/:id                                                             |        |           |            |             |
|  GET   | /message_options                                                               |        |           |            |             |
|  POST  | /message_options                                                               |        |           |            |             |
|  GET   | /message_options/:id                                                           |        |           |            |             |
| PATCH  | /message_options/:id                                                           |        |           |            |             |
|  PUT   | /message_options/:id                                                           |        |           |            |             |
| DELETE | /message_options/:id                                                           |        |           |            |             |
|  GET   | /photos                                                                        |        |           |            |             |
|  POST  | /photos                                                                        |        |           |            |             |
|  GET   | /photos/:id                                                                    |        |           |            |             |
| PATCH  | /photos/:id                                                                    |        |           |            |             |
|  PUT   | /photos/:id                                                                    |        |           |            |             |
| DELETE | /photos/:id                                                                    |        |           |            |             |
|  GET   | /messages                                                                      |        |           |            |             |
|  POST  | /messages                                                                      |        |           |            |             |
|  GET   | /messages/:id                                                                  |        |           |            |             |
| PATCH  | /messages/:id                                                                  |        |           |            |             |
|  PUT   | /messages/:id                                                                  |        |           |            |             |
| DELETE | /messages/:id                                                                  |        |           |            |             |
|  GET   | /user_groups                                                                   |        |           |            |             |
|  POST  | /user_groups                                                                   |        |           |            |             |
|  GET   | /user_groups/:id                                                               |        |           |            |             |
| PATCH  | /user_groups/:id                                                               |        |           |            |             |
|  PUT   | /user_groups/:id                                                               |        |           |            |             |
| DELETE | /user_groups/:id                                                               |        |           |            |             |
|  GET   | /groups                                                                        |        |           |            |             |
|  POST  | /groups                                                                        |        |           |            |             |
|  GET   | /groups/:id                                                                    |        |           |            |             |
| PATCH  | /groups/:id                                                                    |        |           |            |             |
|  PUT   | /groups/:id                                                                    |        |           |            |             |
| DELETE | /groups/:id                                                                    |        |           |            |             |
|  GET   | /clubs                                                                         |        |           |            |             |
|  POST  | /clubs                                                                         |        |           |            |             |
|  GET   | /clubs/:id                                                                     |        |           |            |             |
| PATCH  | /clubs/:id                                                                     |        |           |            |             |
|  PUT   | /clubs/:id                                                                     |        |           |            |             |
| DELETE | /clubs/:id                                                                     |        |           |            |             |
|  GET   | /merches                                                                       |        |           |            |             |
|  POST  | /merches                                                                       |        |           |            |             |
|  GET   | /merches/:id                                                                   |        |           |            |             |
| PATCH  | /merches/:id                                                                   |        |           |            |             |
|  PUT   | /merches/:id                                                                   |        |           |            |             |
| DELETE | /merches/:id                                                                   |        |           |            |             |
|  GET   | /visits                                                                        |        |           |            |             |
|  POST  | /visits                                                                        |        |           |            |             |
|  GET   | /visits/:id                                                                    |        |           |            |             |
| PATCH  | /visits/:id                                                                    |        |           |            |             |
|  PUT   | /visits/:id                                                                    |        |           |            |             |
| DELETE | /visits/:id                                                                    |        |           |            |             |
|  GET   | /lessons                                                                       |        |           |            |             |
|  POST  | /lessons                                                                       |        |           |            |             |
|  GET   | /lessons/:id                                                                   |        |           |            |             |
| PATCH  | /lessons/:id                                                                   |        |           |            |             |
|  PUT   | /lessons/:id                                                                   |        |           |            |             |
| DELETE | /lessons/:id                                                                   |        |           |            |             |
|  GET   | /courses                                                                       |        |           |            |             |
|  POST  | /courses                                                                       |        |           |            |             |
|  GET   | /courses/:id                                                                   |        |           |            |             |
| PATCH  | /courses/:id                                                                   |        |           |            |             |
|  PUT   | /courses/:id                                                                   |        |           |            |             |
| DELETE | /courses/:id                                                                   |        |           |            |             |
|  GET   | /users                                                                         |        |           |            |             |
|  POST  | /users                                                                         |        |           |            |             |
|  GET   | /users/:id                                                                     |        |           |            |             |
| PATCH  | /users/:id                                                                     |        |           |            |             |
|  PUT   | /users/:id                                                                     |        |           |            |             |
| DELETE | /users/:id                                                                     |        |           |            |             |
|  GET   | /login                                                                         |        |           |            |             |
|  POST  | /login                                                                         |        |           |            |             |
| DELETE | /logout                                                                        |        |           |            |             |
|  GET   | /password/new                                                                  |        |           |            |             |
|  GET   | /password/edit                                                                 |        |           |            |             |
| PATCH  | /password                                                                      |        |           |            |             |
|  PUT   | /password                                                                      |        |           |            |             |
|  POST  | /password                                                                      |        |           |            |             |
|  GET   | /signup/cancel                                                                 |        |           |            |             |
|  GET   | /signup/sign_up                                                                |        |           |            |             |
|  GET   | /signup/edit                                                                   |        |           |            |             |
| PATCH  | /signup                                                                        |        |           |            |             |
|  PUT   | /signup                                                                        |        |           |            |             |
| DELETE | /signup                                                                        |        |           |            |             |
|  POST  | /signup                                                                        |        |           |            |             |
|  GET   | /users/:id/approve                                                             |        |           |            |             |
|  POST  | /users/activate                                                                |        |           |            |             |
|  POST  | /users/create_by_email                                                         |        |           |            |             |
|  GET   | /users/:id/offers                                                              |        |           |            |             |
|  GET   | /users/my-offers                                                               |        |           |            |             |
|  GET   | /courses/:id/add_user/:user_id                                                 |        |           |            |             |
|  GET   | /courses/:id/remove_user/:user_id                                              |        |           |            |             |
|  GET   | /courses/by_user_id/:user_id                                                   |        |           |            |             |
|  GET   | /courses/my_courses                                                            |        |           |            |             |
|  GET   | /lessons/by_user_id/:user_id                                                   |        |           |            |             |
|  GET   | /lessons/my_courses                                                            |        |           |            |             |
|  GET   | /rails/active_storage/blobs/:signed_id/*filename                               |        |           |            |             |
|  GET   | /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename |        |           |            |             |
|  GET   | /rails/active_storage/disk/:encoded_key/*filename                              |        |           |            |             |
|  PUT   | /rails/active_storage/disk/:encoded_token                                      |        |           |            |             |
|  POST  | /rails/active_storage/direct_uploads                                           |        |           |            |             |

