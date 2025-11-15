require 'json'
require 'airtable'
require 'active_support/all'

# Get API token from environment variable (Netlify)
AIRTABLE_TOKEN = ENV['AIRTABLE_TOKEN'] || ENV['AIRTABLE_API_KEY']
AIRTABLE_BASE_ID = "appsmvaOoTv8P3ypJ"

if AIRTABLE_TOKEN.nil? || AIRTABLE_TOKEN.empty?
  puts "✗ ERROR: No se encontró el token de Airtable"
  puts "  Configura la variable de entorno AIRTABLE_TOKEN en Netlify"
  puts "  Para desarrollo local, configura: export AIRTABLE_TOKEN='tu_token'"
  exit 1
end

@client = Airtable::Client.new(AIRTABLE_TOKEN)

# Pass in the app key and table name

begin
  @dubbings = @client.table(AIRTABLE_BASE_ID, "dubbings")
  # Get all records with explicit pagination handling
  @dubbings_records = @dubbings.all(:sort => ["date", :asc])
  puts "✓ Obtenidos #{@dubbings_records.count} registros de dubbings"
rescue Airtable::Error => e
  puts "✗ ERROR obteniendo dubbings: #{e.message}"
  puts "  Verifica que el token de Airtable sea válido y tenga los permisos correctos"
  exit 1
rescue => e
  puts "✗ Error inesperado obteniendo dubbings: #{e.message}"
  exit 1
end

begin
  @ads = @client.table(AIRTABLE_BASE_ID, "ads")
  @ads_records = @ads.all(:sort => ["date", :asc])
  puts "✓ Obtenidos #{@ads_records.count} registros de ads"
rescue Airtable::Error => e
  puts "✗ ERROR obteniendo ads: #{e.message}"
  exit 1
rescue => e
  puts "✗ Error inesperado obteniendo ads: #{e.message}"
  exit 1
end

begin
  @audiobooks = @client.table(AIRTABLE_BASE_ID, "audiobooks")
  @audiobooks_records = @audiobooks.all(:sort => ["date", :asc])
  puts "✓ Obtenidos #{@audiobooks_records.count} registros de audiobooks"
rescue Airtable::Error => e
  puts "✗ ERROR obteniendo audiobooks: #{e.message}"
  exit 1
rescue => e
  puts "✗ Error inesperado obteniendo audiobooks: #{e.message}"
  exit 1
end

begin
  @scores = @client.table(AIRTABLE_BASE_ID, "scores")
  @scores_records = @scores.all(:sort => ["name", :asc])
  puts "✓ Obtenidos #{@scores_records.count} registros de scores"
rescue Airtable::Error => e
  puts "✗ ERROR obteniendo scores: #{e.message}"
  exit 1
rescue => e
  puts "✗ Error inesperado obteniendo scores: #{e.message}"
  exit 1
end

# Change the filename here below but make sure it's in the _data folder.
begin
  File.open("_data/dubbings.json", "w") do |f|
    data = @dubbings_records.map { |record| record.attributes }
    f.write(data.to_json)
  end
  puts "✓ Archivo dubbings.json actualizado con #{@dubbings_records.count} registros"
rescue => e
  puts "✗ Error escribiendo dubbings.json: #{e.message}"
  exit 1
end

# Change the filename here below but make sure it's in the _data folder.
begin
  File.open("_data/ads.json", "w") do |f|
    data = @ads_records.map { |record| record.attributes }
    f.write(data.to_json)
  end
  puts "✓ Archivo ads.json actualizado con #{@ads_records.count} registros"
rescue => e
  puts "✗ Error escribiendo ads.json: #{e.message}"
  exit 1
end

# Change the filename here below but make sure it's in the _data folder.
begin
  File.open("_data/audiobooks.json", "w") do |f|
    data = @audiobooks_records.map { |record| record.attributes }
    f.write(data.to_json)
  end
  puts "✓ Archivo audiobooks.json actualizado con #{@audiobooks_records.count} registros"
rescue => e
  puts "✗ Error escribiendo audiobooks.json: #{e.message}"
  exit 1
end

# Change the filename here below but make sure it's in the _data folder.
begin
  File.open("_data/scores.json", "w") do |f|
    data = @scores_records.map { |record| record.attributes }
    f.write(data.to_json)
  end
  puts "✓ Archivo scores.json actualizado con #{@scores_records.count} registros"
rescue => e
  puts "✗ Error escribiendo scores.json: #{e.message}"
  exit 1
end

puts "\n✓ Todos los archivos se han actualizado correctamente"