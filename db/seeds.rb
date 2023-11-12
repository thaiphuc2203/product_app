Brand.destroy_all
@brand1 = Brand.create!(
  name: 'KFC',
  avatar: "https://www.gravatar.com/avatar/#{rand(14)}?s=64&d=identicon&r=PG",
  short_name: 'KFC',
  status: true,
  store_number: 12
)
@brand2 = Brand.create!(
  name: 'the coffee house',
  avatar: "https://www.gravatar.com/avatar/#{rand(14)}?s=64&d=identicon&r=PG",
  short_name: 'TCH',
  status: true,
  store_number: 232
)
@brand3 = Brand.create!(
  name: 'circle K',
  avatar: "https://www.gravatar.com/avatar/#{rand(14)}?s=64&d=identicon&r=PG",
  short_name: 'CRK',
  status: true,
  store_number: 156
)

p "Created #{Brand.count} brands"

# Create Admin USER----------
User.destroy_all
User.create!(
  name: 'Admin',
  email: 'admin@test.com',
  password: 'test123',
  password_confirmation:'test123',
  role: 'Admin',
  status: true
)
@user = User.find_by(email: 'admin@test.com')

p "Created #{@user.name} user"

# Create PRODUCT----------

@product1 = Product.create!(
  name: 'hambeger',
  avatar: "https://www.gravatar.com/avatar/#{rand(14)}?s=128&d=identicon&r=PG",
  sku: 'HBG',
  status: true,
  price: 12,
  brand_id: "#{@brand1.id}")
  @product2 = Product.create!(
    name: 'Drinking beer',
    avatar: "https://www.gravatar.com/avatar/#{rand(14)}?s=128&d=identicon&r=PG",
    sku: 'BER',
    status: true,
    price: 21,
    brand_id: "#{@brand2.id}")
p "Created #{Product.count} products"

# create CARD ------------

Card.destroy_all
@card1 = Card.create!(
  user_id: "#{@user.id}",
  name: "Black Card",
  pin: '123456',
  price: 124,
  product_ids: ["#{@product1.id}", "#{@product2.id}"]
)
@card1.products.build


p "Created #{Card.first.name} card"
p "completed create sample dataa"