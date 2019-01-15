require 'google/apis/calendar_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'fileutils'
require 'json'
require 'airtable'
require 'active_support/all'

TAKE_35 = 5.63
TAKE_VIDEO = 4.06
CG_35 = 50.64
CG_VIDEO = 36.99

OOB_URI = 'urn:ietf:wg:oauth:2.0:oob'.freeze
APPLICATION_NAME = 'Google Calendar API Ruby Quickstart'.freeze
CREDENTIALS_PATH = 'credentials.json'.freeze
# The file token.yaml stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
TOKEN_PATH = 'token.yaml'.freeze
SCOPE = Google::Apis::CalendarV3::AUTH_CALENDAR_READONLY

##
# Ensure valid credentials, either by restoring from the saved credentials
# files or intitiating an OAuth2 authorization. If authorization is required,
# the user's default browser will be launched to approve the request.
#
# @return [Google::Auth::UserRefreshCredentials] OAuth2 credentials
def authorize
  client_id = Google::Auth::ClientId.from_file(CREDENTIALS_PATH)
  token_store = Google::Auth::Stores::FileTokenStore.new(file: TOKEN_PATH)
  authorizer = Google::Auth::UserAuthorizer.new(client_id, SCOPE, token_store)
  user_id = 'default'
  credentials = authorizer.get_credentials(user_id)
  if credentials.nil?
    url = authorizer.get_authorization_url(base_url: OOB_URI)
    puts 'Open the following URL in the browser and enter the ' \
         "resulting code after authorization:\n" + url
    code = gets
    credentials = authorizer.get_and_store_credentials_from_code(
      user_id: user_id, code: code, base_url: OOB_URI
    )
  end
  credentials
end


def getStudio(location)
  if location
    return "Deluxe 103" if location.match(/Deluxe/)
    return "Soundstudio" if location.match(/Soundstudio/)
    return "VSI Sonygraf" if location.match(/Sonygraf/)
    return "Takemaker" if location.match(/Takemaker/)
    return "Dubbing" if location.match(/Dubbing/)
    return "SDI Media" if location.match(/SDI/)
    return "SIK Estudio" if location.match(/SIK/)
  end
  return "Desconocido"
end

def getDistribution(summary)
  if (summary)
    distr = summary.scan(/(?<=distr.).*$/)
    if (distr.size != 0)
      return distr[0].strip
    end
  end
  return "video"
end

def getPrice(cg, takes, distr, description)
  price = 0
  found = false
  if (description) 
    matches = description.scan(/[0-9]+(?=€)/)
    if (matches[0])
      found = true
      price = matches[0]
    end
  end
  if (!found)
    case distr
    when "35mm"
      return (cg*CG_35+takes*TAKE_35).round(2)
    when "video"
      return (cg*CG_VIDEO+takes*TAKE_VIDEO).round(2)
    end
  end
  return price.to_f.round(2)
end

def getCgs(summary)
  if (summary)
    cgs = summary.scan(/[0-9]+(?=cg)/)
    if (cgs.size !=0)
      return cgs[0]
    else
      matches = summary.scan(/[0-9]+(?=tk)/)
      return matches.size
    end
  end
  return "0"
end

def getTakes(summary)
  if (summary)
    matches = summary.scan(/[0-9]+(?=tk)/)
    return matches.map(&:to_i).inject(0, :+)
  end
  return "0"
end

def getDirector(summary)
  if (summary)
    dir = summary.scan(/(?<=dir.).*$/)
    if (dir.size != 0)
      return dir[0].strip
    end
  end
  return "Ninguno"
end


# Initialize the API
service = Google::Apis::CalendarV3::CalendarService.new
service.client_options.application_name = APPLICATION_NAME
service.authorization = authorize

# Fetch the next 10 events for the user
calendar_id = 'no68u7uo0lbmqgs1efsdckng6o@group.calendar.google.com'
response = service.list_events(calendar_id,
                               single_events: true,
                               order_by: 'startTime',
                               time_min: '2019-01-01T00:00:00+00:00')

File.open("_data/calendar.csv", "w") do |f|
  f.write("id,Date,Nombre,Estudio,Distribucion,CG,Takes,Director,Precio\n")
  response.items.each do |event|
    start = event.start.date || event.start.date_time
    takes = getTakes(event.description)
    cg = getCgs(event.description)
    distr = getDistribution(event.description)
    price = getPrice(cg.to_f,takes.to_f,distr, event.description).to_s
    f.write("#{event.id},#{start},#{event.summary},#{getStudio(event.location)},#{distr},#{cg},#{takes},#{getDirector(event.description)},#{price}\n")
  end
end



