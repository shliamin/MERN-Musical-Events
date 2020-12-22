# A function to return the center of any address

require 'json'
require 'open-uri'

def get_coords(street, plz, city)
  url = "https://api.mapbox.com/geocoding/v5/mapbox.places/#{street.downcase.tr!(" ", "_")}_#{plz.to_s}_#{city.downcase.tr!(" ", "_")}.json?access_token=pk.eyJ1Ijoic2hsaWFtaW4iLCJhIjoiY2p6cmNla2F6MTNqajNkcjFzY2lrdTMzdiJ9.SUeVEhR4ZI4uGmuntCQpEw"
  address_serialized = open(url).read
  address = JSON.parse(address_serialized)
  center = address['features'][0]['center']
  center
end

p get_coords('Stralsunder Strasse 14', 13355, 'Berlin')
