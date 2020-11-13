module GlobalGiving
  BASE_URL = ENV['GLOBALGIVING_URL']
  API_KEY = ENV['GLOBALGIVING_API_KEY']

  def self.request(method, path, query)
    request = HTTParty.send(method, "#{BASE_URL}#{path}?api_key=#{API_KEY}", query: query)
    unless request.code / 200 == 1
      Rails.logger.error(code: request.code, message: request.message)
      return false
    end
    
    request.parsed_response
  end

  def self.get(path, query = {})
    request(:get, path, query)
  end

  def self.post(path, query = {})
    request(:post, path, query)
  end
end
