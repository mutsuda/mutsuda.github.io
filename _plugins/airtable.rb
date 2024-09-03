require 'json'
require 'airtable'
require 'active_support/all'
# require 'active_support/all'

# Pass in api key to client
@client = Airtable::Client.new("patBkw4PAnJZCqFIX.e389c77c1d7873d113bb431ed75de3d7ffbfd057b8141190647961ff03113ef3")

# Pass in the app key and table name

@dubbings = @client.table("appsmvaOoTv8P3ypJ", "dubbings")
@dubbings_records = @dubbings.all(:sort => ["date", :asc])

@ads = @client.table("appsmvaOoTv8P3ypJ", "ads")
@ads_records = @ads.all(:sort => ["date", :asc])

@audiobooks = @client.table("appsmvaOoTv8P3ypJ", "audiobooks")
@audiobooks_records = @audiobooks.all(:sort => ["date", :asc])

@scores = @client.table("appsmvaOoTv8P3ypJ", "scores")
@scores_records = @scores.all(:sort => ["name", :asc])

# Change the filename here below but make sure it's in the _data folder.
File.open("_data/dubbings.json", "w") do |f|
    data = @dubbings_records.map { |record| record.attributes }
    f.write(data.to_json)
end

# Change the filename here below but make sure it's in the _data folder.
File.open("_data/ads.json", "w") do |f|
    data = @ads_records.map { |record| record.attributes }
    f.write(data.to_json)
end

# Change the filename here below but make sure it's in the _data folder.
File.open("_data/audiobooks.json", "w") do |f|
    data = @audiobooks_records.map { |record| record.attributes }
    f.write(data.to_json)
end

# Change the filename here below but make sure it's in the _data folder.
File.open("_data/scores.json", "w") do |f|
    data = @scores_records.map { |record| record.attributes }
    f.write(data.to_json)
end