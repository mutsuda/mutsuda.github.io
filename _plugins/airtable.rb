require 'json'
require 'airtable'
require 'active_support/all'

module Jekyll
  class AirtableGenerator < Generator
    safe true
    priority :low

    def generate(site)
      begin
        # Pass in api key to client from environment variable
        # Set AIRTABLE_API_KEY in Netlify environment variables
        api_key = ENV['AIRTABLE_API_KEY']
        unless api_key
          Jekyll.logger.warn "Airtable Generator:", "AIRTABLE_API_KEY not set, skipping Airtable data fetch"
          return
        end
        client = Airtable::Client.new(api_key)

        # Pass in the app key and table name
        dubbings = client.table("appsmvaOoTv8P3ypJ", "dubbings")
        dubbings_records = dubbings.all(:sort => ["date", :asc])

        ads = client.table("appsmvaOoTv8P3ypJ", "ads")
        ads_records = ads.all(:sort => ["date", :asc])

        audiobooks = client.table("appsmvaOoTv8P3ypJ", "audiobooks")
        audiobooks_records = audiobooks.all(:sort => ["date", :asc])

        scores = client.table("appsmvaOoTv8P3ypJ", "scores")
        scores_records = scores.all(:sort => ["name", :asc])

        # Ensure _data directory exists
        data_dir = File.join(site.source, "_data")
        FileUtils.mkdir_p(data_dir) unless File.directory?(data_dir)

        # Change the filename here below but make sure it's in the _data folder.
        File.open(File.join(data_dir, "dubbings.json"), "w") do |f|
          data = dubbings_records.map { |record| record.attributes }
          f.write(data.to_json)
        end

        # Change the filename here below but make sure it's in the _data folder.
        File.open(File.join(data_dir, "ads.json"), "w") do |f|
          data = ads_records.map { |record| record.attributes }
          f.write(data.to_json)
        end

        # Change the filename here below but make sure it's in the _data folder.
        File.open(File.join(data_dir, "audiobooks.json"), "w") do |f|
          data = audiobooks_records.map { |record| record.attributes }
          f.write(data.to_json)
        end

        # Change the filename here below but make sure it's in the _data folder.
        File.open(File.join(data_dir, "scores.json"), "w") do |f|
          data = scores_records.map { |record| record.attributes }
          f.write(data.to_json)
        end
      rescue => e
        Jekyll.logger.warn "Airtable Generator:", "Failed to fetch data from Airtable: #{e.message}"
        Jekyll.logger.warn "Airtable Generator:", "Using existing data files if available"
      end
    end
  end
end
