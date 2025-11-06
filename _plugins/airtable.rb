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
        # Log API key presence (but not the actual key for security)
        Jekyll.logger.info "Airtable Generator:", "API key found, length: #{api_key.length} characters"
        # Strip any whitespace that might have been added
        api_key = api_key.strip
        client = Airtable::Client.new(api_key)

        # Pass in the app key and table name
        # Fetch each table separately to handle errors gracefully
        dubbings_records = []
        ads_records = []
        audiobooks_records = []
        scores_records = []
        
        begin
          dubbings = client.table("appsmvaOoTv8P3ypJ", "dubbings")
          dubbings_records = dubbings.all(:sort => ["date", :asc])
          Jekyll.logger.info "Airtable Generator:", "Fetched #{dubbings_records.length} dubbings records"
        rescue => e
          Jekyll.logger.warn "Airtable Generator:", "Failed to fetch dubbings: #{e.message}"
        end
        
        begin
          ads = client.table("appsmvaOoTv8P3ypJ", "ads")
          ads_records = ads.all(:sort => ["date", :asc])
          Jekyll.logger.info "Airtable Generator:", "Fetched #{ads_records.length} ads records"
        rescue => e
          Jekyll.logger.warn "Airtable Generator:", "Failed to fetch ads: #{e.message}"
        end
        
        begin
          audiobooks = client.table("appsmvaOoTv8P3ypJ", "audiobooks")
          audiobooks_records = audiobooks.all(:sort => ["date", :asc])
          Jekyll.logger.info "Airtable Generator:", "Fetched #{audiobooks_records.length} audiobooks records"
        rescue => e
          Jekyll.logger.warn "Airtable Generator:", "Failed to fetch audiobooks: #{e.message}"
        end
        
        begin
          scores = client.table("appsmvaOoTv8P3ypJ", "scores")
          scores_records = scores.all(:sort => ["name", :asc])
          Jekyll.logger.info "Airtable Generator:", "Fetched #{scores_records.length} scores records"
        rescue => e
          Jekyll.logger.warn "Airtable Generator:", "Failed to fetch scores: #{e.message}"
        end

        # Ensure _data directory exists
        data_dir = File.join(site.source, "_data")
        FileUtils.mkdir_p(data_dir) unless File.directory?(data_dir)

        # Change the filename here below but make sure it's in the _data folder.
        # Always overwrite files when we have API key
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
        
        Jekyll.logger.info "Airtable Generator:", "Successfully fetched and saved data from Airtable"
      rescue => e
        Jekyll.logger.warn "Airtable Generator:", "Failed to fetch data from Airtable: #{e.message}"
        Jekyll.logger.warn "Airtable Generator:", "Using existing data files if available"
        # Don't overwrite existing files when fetch fails
        # Only create scores.json if it doesn't exist (it's not in the repo)
        data_dir = File.join(site.source, "_data")
        scores_file = File.join(data_dir, "scores.json")
        unless File.exist?(scores_file)
          FileUtils.mkdir_p(data_dir) unless File.directory?(data_dir)
          File.open(scores_file, "w") { |f| f.write("[]") }
        end
      end
    end
  end
end
