class JsonWebTokenService
  def self.test
    puts 'testing'
  end

  def self.encode(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base,
    'HS256')
  end

  def self.decode(token)
    JWT.decode(token, Rails.application.secrets.secret_key_base,
               algorithm: 'HS256').inject(:merge)
  end
end
