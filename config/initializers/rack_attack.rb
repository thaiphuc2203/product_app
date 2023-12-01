class Rack::Attack
  # Theo mặc định thì Rack::Attack sử dụng Rails.cache để lưu trữ thông tin của requests
  # nhưng bạn cũng có thể config bộ nhớ lưu trữ riêng cho nó, như dùng Redis, Memory như sau:
  # redis_client = Redis.connect(url: ENV["REDIS_URL"])
  # Rack::Attack.cache.store = Rack::Attack::StoreProxy::RedisStoreProxy.new(redis_client)
  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  # Luôn luôn cho phép truy cập từ localhost
  # (blocklist & throttle sẽ được bỏ qua, không phải kiểm tra)
  whitelist('allow-localhost') do |req|
    # những request từ local host sẽ trả giá trị true
    '127.0.0.1' == req.ip || '::1' == req.ip
  end

  # từ chối các request có địa chỉ ip là 1.2.3.4
  blocklist('block 1.2.3.4') do |req|
    '1.2.3.4' == req.ip
  end

  # từ chối request logins từ các bad user agent
  blocklist('block bad UA logins') do |req|
    req.path == '/login' && req.post? && req.user_agent == 'BadUA'
  end

  # cho phép 1 IP request thực hiện 5 requests mỗi 5 giây
  throttle('req/ip', limit: 5, period: 5) do |req|
    req.ip
  end

  # Ở đây có 1 nhược điểm là sau 1 phút query vẫn được request lên server bình thường => chúng ta có thể mở rộng phạm vi xử lý request lên, ví dụ 4 phút được request bao nhiêu lần, 8 phút được bao nhiêu lần
  (2..4).each do |level|
    throttle("login/ip/#{level}", limit: (20 * (2**level)),
                                  period: (2**level))
  end

  # ngưỡng login cho email parameter giới hạn 6 reqs/phút
  # trả về giá trị email nếu đường dẫn là login và kiểu request là post
  Rack::Attack.throttle('logins/email', limit: 6, period: 60.seconds) do |req|
    req.params['email'] if req.path == '/login' && req.post?
  end

  # Bạn có thể cài đặt giới hạn theo proc như sau
  limit_proc = proc { |req| req.env['REMOTE_USER'] == 'admin' ? 100 : 1 } # giới hạn 100 lần
  period_proc = proc { |req| req.env['REMOTE_USER'] == 'admin' ? 1.second : 1.minute } # giới hạn trong 1 phút
  Rack::Attack.throttle('req/ip', limit: limit_proc, period: period_proc) do |req|
    req.ip
  end

  # Gửi response sau đây tới clients đã đạt ngưỡng
  self.throttled_response = lambda { |env|
    retry_after = (env['rack.attack.match_data'] || {})[:period]
    [
      429,
      { 'Content-Type' => 'application/json', 'Retry-After' => retry_after.to_s },
      [{ error: 'Throttle limit reached. Retry later.' }.to_json]
    ]
  }

  Rack::Attack.throttled_response = lambda do |_env|
    #  Lưu ý: ở dây bạn có thể lấy thêm các thông tin trong dữ liệu như
    #  env['rack.attack.matched'],
    #  env['rack.attack.match_type'],
    #  env['rack.attack.match_data']

    # Sử dụng lỗi 503 để khiến kẻ tấn công tưởng rằng hắn đã DOS trang web thành công
    # Mặc định Rack::Attack trả về 429 nếu truy cập quá ngưỡng - thorttled
    [503, {}, ["Server Error\n"]]
  end

  self.blocklisted_response = lambda do |_env|
    [503, {}, ['Blocked']]
  end
end
